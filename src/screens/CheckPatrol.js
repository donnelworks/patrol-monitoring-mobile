import { StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import { Grid, Icon, Screen } from '@themes'
import { Button, Card, Input, Text, Toast } from '@components'
import { colors } from '@styles'
import { dateFormat, timeFormat } from '@helpers'
import { logout, positionCheck, saveActivity } from '@services'
import Geolocation from 'react-native-geolocation-service'

const CheckPatrol = ({navigation, route}) => {

  const params = route?.params;
  const[form, setForm] = useState({notes: "", media: null});
  const [toastMessage, setToastMessage] = useState("");
  const [isGetPosition, setIsGetPosition] = useState(false);
  const[loading, setLoading] = useState(false);

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
      if (error.statusMessage === "SESSION_ERROR") {
        await logout();
        navigation.replace('login');
      } else if (error.statusMessage === "POSITION_NOT_VALID") {
        setToastMessage(error.data);
      } else {
        console.log(error);
      }
    }
  } 

  const getPosition = () => {
    setToastMessage("");
    setIsGetPosition(true);
    Geolocation.getCurrentPosition(
      position => {
        onSaveActivityHandler(position?.coords?.latitude, position?.coords?.longitude)
        setIsGetPosition(false);
      },
      error => {
        setToastMessage("GPS belum dinyalakan")
        setIsGetPosition(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );
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
            <Grid.Row rowStyles={{borderBottomWidth: 1, borderColor: colors.softGray, paddingBottom: 15}}>
              <Grid.Col xs={2}>
                <Icon.Location size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{params?.region_name}</Text>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row rowStyles={{paddingTop: 15, paddingBottom: 5}}>
              <Grid.Col xs={2}>
                <Icon.UserCircle size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text>{params?.userName}</Text>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={2}>
                <Icon.Flag size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
              </Grid.Col>
              <Grid.Col xs={10}>
                <Text type="OpenSansBold">{params?.unit_short_name}</Text>
                <Text>{params?.team_name}</Text>
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

        {params?.status_checkin !== "2" && (
        <Screen.Section padding='15 15 15 15'>
          <Card shadow>
            <Grid.Row rowStyles={{paddingBottom: 5}}>
              
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
                  />
                </Grid.Col>
              
              <Grid.Col xs={12}>
                <Button title={params?.status_checkin === "0" ? "Check In" : "Check Out"} fillColor={params?.status_checkin === "0" ? colors.primary : colors.secondary} onPress={getPosition} />
              </Grid.Col>
            </Grid.Row>
          </Card>
        </Screen.Section>)}
      </ScrollView>
    </Screen>
  )
}

export default CheckPatrol

const styles = StyleSheet.create({})