import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Platform, Linking} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Gap, Grid, Icon, Screen } from '@themes'
import { Alert, Button, Card, ImagePopup, Input, Text, Toast } from '@components'
import { colors } from '@styles'
import { cameraPermission, dateFormat, mediaurl, timeFormat } from '@helpers'
import { getFinishActivity, logout, positionCheck, saveActivity } from '@services'
import Geolocation from 'react-native-geolocation-service'

const CheckPatrol = ({navigation, route}) => {

  const params = route?.params;
  const [form, setForm] = useState({notes: "", media: null});
  const [toastMessage, setToastMessage] = useState("");
  const [isGetPosition, setIsGetPosition] = useState(false);
  const [formValidation, setFormValidation] = useState({media: "", notes: ""});
  const [loading, setLoading] = useState(false);
  const [statusTimer, setStatusTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [finishActivity, setFinishActivity] = useState({checkIn: null, checkOut: null});

  useEffect(() => {
    if (params?.status_checkin === "2") {
      loadFinishActivity();
    }
  }, []);

  useEffect(() => {
    if (route.params?.media) {
      setForm(prevState => ({...prevState, media: route.params?.media}));
      setFormValidation(prevState => ({...prevState, media: ""}));
    }
  }, [route.params?.media]);

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
          navigation.replace('finish', {status: params?.status_checkin === "0" ? "Check In" : "Check Out"});
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

      if (!form.media && !form.notes) {
        throw {
          media: "Foto kegiatan wajib diambil",
          notes: "Catatan kegiatan wajib diisi",
        }
      }

      if (!form.media) {
        throw {
          media: "Foto kegiatan wajib diambil",
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

  const onCameraHandler = async () => {
    try {
      const permissionResult = await cameraPermission();
      if (permissionResult) {
        navigation.navigate('checkPatrolCamera');
      }
    } catch (error) {
      console.log(error);
    }
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
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
      }}>
        <Screen.Section padding='15 15 0 15'>
          {params?.status_checkin === "2" && <Alert message="Kegiatan telah selesai" type="success" />}
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
            <Grid.Row>
              <Grid.Col xs={6}>
                <Text size={14} type="OpenSansSemiBold">Lokasi Kegiatan</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => openMap(params?.latitude, params?.longitude)}>
                    <Text size={12} color='primary'>Buka Map</Text>
                  </TouchableOpacity>
                </View>
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>

        {params?.status_checkin !== "2" && (
        <Screen.Section padding='15 15 15 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              {form.media && (
                <Grid.Col xs={12}>
                  <ImagePopup image={form.media} />
                </Grid.Col>
              )}
              <Grid.Col xs={12}>
                <TouchableOpacity style={styles.takePhoto} onPress={onCameraHandler}>
                  <Icon.Camera size={20} strokeColor={colors.success} fillColor={colors.softSuccess} style={{marginRight: 10}} />
                  <Text type="OpenSansSemiBold" color="success">Ambil Foto</Text>
                </TouchableOpacity>
                {!!formValidation.media?.length && <Text size={12} color="secondary" style={{marginBottom: 10}}>{formValidation.media}</Text>}
              </Grid.Col>
              <Grid.Col xs={12}>
                <Input
                  value={form.notes}
                  onChangeText={(text) => setForm({...form, notes: text})}
                  placeholder="Masukan Catatan Kegiatan"
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    textAlignVertical: 'top',
                  }}
                  keyboardType='default'
                  invalidMessage={formValidation.notes}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <Gap height={10} />
                <Button title={(params?.status_checkin === "0" ? "Check In" : "Check Out") + (timer > 0 ? ` (${timer})` : '')} fillColor={params?.status_checkin === "0" ? colors.primary : colors.secondary} disabled={timer > 0} onPress={getPosition} />
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>)}
        
        {params?.status_checkin === "2" && !finishActivity.checkIn && !finishActivity.checkOut && (
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

        {(params?.status_checkin === "2" && !!finishActivity.checkIn) && (
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
                <ImagePopup image={`${mediaurl}${finishActivity.checkIn?.media}`} />
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

        {(params?.status_checkin === "2" && !!finishActivity.checkOut) && (
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
                <ImagePopup image={`${mediaurl}${finishActivity.checkOut?.media}`} />
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
  }
})