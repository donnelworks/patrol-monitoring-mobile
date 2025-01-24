import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Platform, Linking} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Gap, Grid, Icon, Screen } from '@themes'
import { Alert, Button, Card, ImageInput, Input, Text, Toast } from '@components'
import { colors } from '@styles'
import { baseurl, cameraPermission, dateFormat, mediaurl, timeFormat } from '@helpers'
import { getFinishActivity, logout, positionCheck, saveActivity } from '@services'
import Geolocation from 'react-native-geolocation-service'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { SheetManager } from 'react-native-actions-sheet'
import WebView from 'react-native-webview'

const CheckPatrol = ({navigation, route}) => {

  const params = route?.params;
  const [statusCheckin, setStatusCheckin] = useState(params?.status_checkin);
  const [form, setForm] = useState({notes: "", media: []});
  const [toastMessage, setToastMessage] = useState("");
  const [isGetPosition, setIsGetPosition] = useState(false);
  const [formValidation, setFormValidation] = useState({media: "", notes: ""});
  const [loading, setLoading] = useState(false);
  const [statusTimer, setStatusTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [finishActivity, setFinishActivity] = useState({checkIn: null, checkOut: null});

  useEffect(() => {
    if (statusCheckin === "2") {
      loadFinishActivity();
    }
  }, []);

  useEffect(() => {
    let timerId;
    if (statusTimer) {
      timerId = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          setStatusTimer(false);
          clearInterval(timerId);
        });
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [statusTimer]);

  const loadFinishActivity = async () => {
    try {
      const res = await getFinishActivity(params);
      if (res.success) {
        setFinishActivity(prevState => ({...prevState, checkIn: res.data?.check_in, checkOut: res.data?.check_out}));
      }
    } catch (error) {
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      }
    }
  }

  const onSaveActivityHandler = async (memberLatitude, memberLongitude) => {
    try {
      setLoading(true);

      let requestData = {
        ...form,
        ...params,
        memberLatitude,
        memberLongitude,
      }

      const resCheckPos = await positionCheck(requestData);
      if (resCheckPos.success) {
        const res = await saveActivity(requestData);
        if (res.success) {
          navigation.replace('finish', {status: statusCheckin === "0" ? "Check In" : "Check Out"});
        }
      }
    } catch (error) {
      setLoading(false);
      setStatusTimer(true);
      setTimer(10);
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      } else if (error.statusMessage === "NOT_ACCESS_MEMBER") {
        setToastMessage(error.data);
      } else if (error.statusMessage === "ACTIVITY_IS_FINISHED") {
        loadFinishActivity();
        setStatusCheckin("2");
        setToastMessage(error.data);
      } else if (error.statusMessage === "ACTIVITY_IS_CANCELED") {
        setToastMessage(error.data);
      } else if (error.statusMessage === "POSITION_NOT_VALID") {
        setToastMessage(error.data);
      } else {
        console.log(error);
      }
    }
  } 

  const getPosition = async () => {
    try {
      setFormValidation(prevState => ({...prevState, media: "", notes: ""}));
      setToastMessage("");

      if (!form.media.length && !form.notes) {
        throw {
          media: "Foto kegiatan wajib ditambahkan",
          notes: "Catatan kegiatan wajib diisi",
        }
      }

      if (!form.media.length) {
        throw {
          media: "Foto kegiatan wajib ditambahkan",
          notes: "",
        }
      }

      if (!form.notes) {
        throw {
          media: "",
          notes: "Catatan kegiatan wajib diisi",
        }
      }

      setIsGetPosition(true);
      Geolocation.getCurrentPosition(
        position => {
          onSaveActivityHandler(position?.coords?.latitude, position?.coords?.longitude)
          setIsGetPosition(false);
        },
        error => {
          setToastMessage("GPS belum dinyalakan");
          setIsGetPosition(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    } catch (error) {
      setFormValidation(prevState => ({...prevState, media: error.media, notes: error.notes}));
    }
  }

  const onChangeTextHandler = (text) => {
    setForm({...form, notes: text});
    setFormValidation(prevState => ({...prevState, notes: ""}));
  }

  const onRemoveImageHandler = (image) => {
    let newMedia = form.media?.filter(function(item) {
      return item !== image;
    });

    setForm(prevState => ({
      ...prevState,
      media: newMedia
    }));
  }

  const onPickImageHandler = async () => {
    const selectedPickImage = await SheetManager?.show('pick-image-sheet');
    if (selectedPickImage === 'camera') {
      onCameraPermissionHandler();
    }
    if (selectedPickImage === 'gallery') {
      onLaunchLibrary();
    }
  }

  const onCameraPermissionHandler = async () => {
    try {
      const permissionResult = await cameraPermission();
      if (permissionResult) {
        onLaunchCamera();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onLaunchCamera = () => {
    let options = {
      includeBase64: true,
      quality: 0.5,
      maxWidth: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setForm(prevState => ({
          ...prevState,
          media: [
            ...form.media,
            response.assets[0].base64
          ]
        }));
        setFormValidation(prevState => ({...prevState, media: ""}));
      }
    });
  }

  const onLaunchLibrary = () => {
    let options = {
      includeBase64: true,
      quality: 0.5,
      maxWidth: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setForm(prevState => ({
          ...prevState,
          media: [
            ...form.media,
            response.assets[0].base64
          ]
        }));
        setFormValidation(prevState => ({...prevState, media: ""}));
      }
    });
  }

  const openMap = (lat, lng) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}`,
    });
    Linking.openURL(url);
  }

  if (loading || isGetPosition) {
    return (
      <Screen justifyContent="center">
        <Screen.Section alignItems="center">
          <ActivityIndicator size="large" color={colors.secondary} />
          {isGetPosition && <Text style={{marginTop: 5}}>Mendapatkan posisi...</Text>}
        </Screen.Section>
      </Screen>
    )
  }

  return (
    <Screen>
      {!!toastMessage.length && <Toast messages={toastMessage} />}
      <ScrollView
      overScrollMode='never'
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
      }}>
        <Screen.Section padding='15 15 0 15'>
          {(statusCheckin === "2" && !params?.canceled) && <Alert message="Kegiatan telah selesai" type="success" />}
          {params?.canceled && <Alert message="Kegiatan telah dibatalkan" />}
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 10}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Detail Kegiatan</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.WatchTime size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{timeFormat(params?.time)}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.Calendar size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{dateFormat(params?.date, "date-string-full", " ")}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={2}>
                <Icon.Location size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{params?.region_name}</Text>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>

        <Screen.Section padding='15 15 0 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 10}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Deskripsi Kegiatan</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <Text size={12}>{params?.activity}</Text>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>

        <Screen.Section padding='15 15 0 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 10}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Lokasi Kegiatan</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <TouchableOpacity style={styles.mapContainer} onPress={() => openMap(params?.latitude, params?.longitude)}>
                  <WebView
                    originWhitelist={['*']}
                    source={{uri: `${baseurl}activity/map?lat=${params?.latitude}&lng=${params?.longitude}`}}
                    scalesPageToFit
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      flex: 1
                    }}
                  />
                </TouchableOpacity>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>

        {(statusCheckin !== "2" && !params?.canceled) && (
        <Screen.Section padding='15 15 15 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 10}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Laporan Kegiatan</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <ImageInput images={form.media} onPickImage={onPickImageHandler} onRemoveImage={onRemoveImageHandler} />
                {!!formValidation.media?.length && <Text size={12} color="secondary" style={{marginBottom: 10}}>{formValidation.media}</Text>}
              </Grid.Col>
              <Grid.Col xs={12}>
                <Input
                  value={form.notes}
                  onChangeText={onChangeTextHandler}
                  placeholder="Masukan Catatan Kegiatan"
                  multiline={true}
                  numberOfLines={4}
                  maxLength={700}
                  style={{
                    textAlignVertical: 'top',
                  }}
                  keyboardType='default'
                  invalidMessage={formValidation.notes}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <Gap height={10} />
                <Button title={(statusCheckin === "0" ? "Check In" : "Check Out") + (timer > 0 ? ` (${timer})` : '')} fillColor={statusCheckin === "0" ? colors.primary : colors.secondary} disabled={timer > 0} onPress={getPosition} />
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>)}
        
        {params?.canceled && (
          <Screen.Section padding='15 15 0 15'>
            <Card shadow>
              <Grid.Row rowStyles={{paddingBottom: 10}}>
                <Grid.Col xs={12}>
                  <Text size={14} type="OpenSansSemiBold">Alasan Pembatalan</Text>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row rowStyles={{paddingBottom: 5}}>
                <Grid.Col xs={12}>
                  <View style={{padding: 10, borderRadius: 10, backgroundColor: colors.softGray}}>
                    <Text size={12}>{params?.canceled_notes}</Text>
                  </View>
                </Grid.Col>
              </Grid.Row>
            </Card>
          </Screen.Section>
        )}
        
        {statusCheckin === "2" && !finishActivity.checkIn && !finishActivity.checkOut && (
          <Screen.Section padding='15 15 15 15'>
            <Card shadow>
              <Grid.Row rowStyles={{paddingBottom: 5}}>
                <Grid.Col xs={12}>
                  <View style={{width: 70, height: 20, borderRadius: 50, backgroundColor: colors.softGray}} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row rowStyles={{paddingBottom: 5}}>
                <Grid.Col xs={12}>
                  <View style={{width: 150, height: 20, borderRadius: 50, backgroundColor: colors.softGray}} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row rowStyles={{paddingBottom: 5}}>
                <Grid.Col xs={12}>
                  <View style={{width: 150, height: 20, borderRadius: 50, backgroundColor: colors.softGray}} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row rowStyles={{paddingBottom: 5}}>
                <Grid.Col xs={12}>
                  <View style={{width: '100%', height: 200, borderRadius: 8, backgroundColor: colors.softGray}} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col xs={12}>
                  <View style={{width: 120, height: 20, borderRadius: 50, backgroundColor: colors.softGray}} />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <Gap height={5} />
                  <View style={{width: '100%', height: 20, borderRadius: 50, backgroundColor: colors.softGray}} />
                </Grid.Col>
              </Grid.Row>
            </Card>
          </Screen.Section>
        )}

        {(statusCheckin === "2" && !!finishActivity.checkIn) && (
        <Screen.Section padding='15 15 15 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Check In</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.WatchTime size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{timeFormat(finishActivity.checkIn?.time)}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.UserCircle size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{finishActivity.checkIn?.member_name}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <ImageInput images={finishActivity.checkIn?.media.split('; ')} />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={12}>
                <Text size={12} type="OpenSansSemiBold">Catatan Kegiatan:</Text>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Gap height={5} />
                <Text size={12}>{finishActivity.checkIn?.notes}</Text>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>)}

        {(statusCheckin === "2" && !!finishActivity.checkOut) && (
        <Screen.Section padding='0 15 15 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <Text size={14} type="OpenSansSemiBold">Check Out</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.WatchTime size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{timeFormat(finishActivity.checkOut?.time)}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.UserCircle size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{finishActivity.checkOut?.member_name}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              <Grid.Col xs={12}>
                <ImageInput images={finishActivity.checkOut?.media?.split('; ')} />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={12}>
                <Text size={12} type="OpenSansSemiBold">Catatan Kegiatan:</Text>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Gap height={5} />
                <Text size={12}>{finishActivity.checkOut?.notes}</Text>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>)}
      </ScrollView>
    </Screen>
  )
}

export default CheckPatrol

const styles = StyleSheet.create({
  takePhoto: {
    flexDirection: 'row',
    backgroundColor: colors.softSuccess,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.success
  },
  mapContainer: {
    flex: 1,
    height: 130,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2
  }
})