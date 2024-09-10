import {StyleSheet, ActivityIndicator, FlatList, View, RefreshControl} from 'react-native';
import React, {useState, useCallback} from 'react';
import {ActivityList, Button, Card, Text, Toast} from '@components';
import {Screen, Grid, Gap, Icon} from '@themes';
import { colors } from '@styles';
import { activityStatusCheck, getActivity, logout } from '@services';
import { fineLocationPermission } from '@helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
  const [activities, setActivities] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState({memberName: "", unitShortName: "", teamName: ""});

  useFocusEffect(
    useCallback(() => {
      loadActivity();
    }, [])
  );

  const loadActivity = async () => {
    try {
      const res = await getActivity();
      const memberName = await AsyncStorage.getItem('memberName');
      const unitShortName = await AsyncStorage.getItem('unitShortName');
      const teamName = await AsyncStorage.getItem('teamName');
      setUser(prevState => ({...prevState, memberName, unitShortName, teamName}));
      if (res.success) {
        setActivities(res?.data);
      }
    } catch (error) {
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      }
    } finally {
      setLoading(false);
    }
  }

  const refreshActivity = async () => {
    try {
      setRefresh(true);
      const res = await getActivity();
      if (res.success) {
        setActivities(res?.data);
      }
    } catch (error) {
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      }
    } finally {
      setRefresh(false);
    }
  }

  const onCheckPatrolHandler = async (item) => {
    try {
      setToastMessage("");
      const permissionResult = await fineLocationPermission();
      if (permissionResult) {
        setLoading(true);
        const resStatusCheck = await activityStatusCheck(item);
        if (resStatusCheck.success) {
          navigation.navigate('checkPatrol', item);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      } else if (error.statusMessage === "ACTIVITY_IS_CANCELED") {
        setToastMessage(error.data);
        loadActivity();
      } else if (error.statusMessage === "ACTIVITY_STILL_ACTIVE") {
        setToastMessage(error.data);
      } else {
        console.log('error', error);
      }
    }
  }

  const onReloadHandler = () => {
    setLoading(true);
    loadActivity();
  }

  const onLogout = async () => {
    await logout();
    navigation.replace('login');
  }

  if (loading) {
    return (
      <Screen justifyContent="center">
        <Screen.Section alignItems="center">
          <ActivityIndicator size="large" color={colors.secondary} />
        </Screen.Section>
      </Screen>
    )
  }

  return (
    <Screen>
      {!!toastMessage.length && <Toast messages={toastMessage} />}
      <Screen.Section padding="0 15 0 15">
        <Grid.Row>
          <Grid.Col xs={6}>
            <Text type="OpenSansExtraBold" size={28} color="primary">
              SIJAGA
            </Text>
          </Grid.Col>
          <Grid.Col xs={6}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
              <Icon.Logout size={23} fillColor={colors.softPrimary} strokeColor={colors.primary} onPress={() => onLogout()} />
            </View>
          </Grid.Col>
        </Grid.Row>
      </Screen.Section>

      <Screen.Section padding="15 15 0 15">
        <Card shadow>
          <Grid.Row>
            <Grid.Col xs={2}>
              <Icon.UserCircle size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
            </Grid.Col>
            <Grid.Col xs={10}>
              <Text>{user?.memberName}</Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col xs={2}>
              <Icon.Flag size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
            </Grid.Col>
            <Grid.Col xs={10}>
              <Text type="OpenSansBold">{user?.unitShortName}</Text>
              <Text>{user?.teamName}</Text>
            </Grid.Col>
          </Grid.Row>
        </Card>
      </Screen.Section>

      {!!activities.length && 
        <>
          <Screen.Section padding="0 15 0 15">
            <Grid.Row>
              <Grid.Col xs={12}>
                <Gap height={20} />
                <Text type="OpenSansBold" size={16}>
                  Pilih Kegiatan
                </Text>
              </Grid.Col>
            </Grid.Row>
          </Screen.Section>
          <Screen.Section style={{flex: 1}}>
            <FlatList
              data={activities}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor="#FFFFFF"
                  refreshing={refresh}
                  onRefresh={refreshActivity}
                  colors={[`${colors.secondary}`]}
                />
              }
              renderItem={({item}) => {
                if (item?.status_checkin !== "1") {
                  return (
                    <ActivityList 
                      time={item.time}
                      activity={item.activity}
                      region={item.region_name}
                      status={item.status_checkin}
                      updated={item.updated}
                      canceled={item.canceled}
                      border={true}
                      onPress={() => onCheckPatrolHandler(item)}
                    />
                  );
                } else {
                  if (activities.length === 1) {
                    return (
                      <View style={{alignItems: 'center'}}>
                        <Text type="OpenSansSemiBold" color="border">Tidak ada kegiatan</Text>
                      </View>
                    )
                  }
                }
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 120,
                paddingHorizontal: 15,
                flexGrow: 1,
              }}
            />
          </Screen.Section>
          
          {activities?.map(item => {
            if (item?.status_checkin === "1") {
              return (
                <Screen.Section 
                  key={item?.id}
                  style={{
                  backgroundColor: colors.light,
                  borderTopWidth: 1,
                  borderColor: colors.softGray,
                  flex: 1,
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                }}
                padding='10 15 10 15'
                >
                  <ActivityList 
                    time={item.time}
                    activity={item.activity}
                    region={item.region_name}
                    status={item.status_checkin}
                    updated={item.updated}
                    canceled={item.canceled}
                    shadow={true}
                    onPress={() => onCheckPatrolHandler(item)}
                  />
                </Screen.Section>
              )
            }
          })}
        </>
      }

      {!activities.length && 
      <Screen.Section justifyContent='center' padding='0 15 0 15' style={{flex: 1}}>
        <Grid.Row>
          <Grid.Col xs={12}>
            <View style={{alignItems: 'center'}}>
              <Text type="OpenSansBold" color="border" size={18}>Tidak ada kegiatan</Text>
              <Text color="border" size={12} style={{textAlign: 'center'}}>Atau hubungi Admin untuk informasi lebih lanjut</Text>
            </View>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Gap height={10} />
            <View style={{alignItems: 'center'}}>
              <Button title="Muat Ulang" onPress={onReloadHandler} />
            </View>
          </Grid.Col>
        </Grid.Row>
      </Screen.Section>}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
