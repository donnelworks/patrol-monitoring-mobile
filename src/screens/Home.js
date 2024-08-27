import {StyleSheet, ActivityIndicator, FlatList, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {ActivityList, Button, Text, Toast} from '@components';
import {Screen, Grid, Gap, Icon} from '@themes';
import { colors } from '@styles';
import { activityStatusCheck, getActivity, logout } from '@services';
import { fineLocationPermission } from '@helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
  const [activities, setActivities] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadActivity();
    }, [])
  );

  const loadActivity = async () => {
    try {
      const res = await getActivity();
      if (res.success) {
        setActivities(res?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      }
    }
  }

  const onCheckPatrolHandler = async (item) => {
    try {
      setToastMessage("");
      const permissionResult = await fineLocationPermission();
      const userName = await AsyncStorage.getItem('userName');
      if (permissionResult) {
        setLoading(true);
        const res = await activityStatusCheck(item);
        if (res.success) {
          navigation.navigate('checkPatrol', {...item, userName});
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.statusMessage === "SESSION_ERROR") {
        navigation.replace('login');
        await logout();
      } else if (error.statusMessage === "NOT_ACCESS_MEMBER") {
        setToastMessage(error.data);
      } else if (error.statusMessage === "IS_ACTIVITY_ACTIVE") {
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
      {/* Header */}
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
            <Grid.Row>
              <Grid.Col xs={12}>
                <FlatList
                  data={activities}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    if (item?.status_checkin !== "1") {
                      return (
                        <ActivityList 
                          time={item.time}
                          activity={item.activity}
                          region={item.region_name}
                          status={item.status_checkin}
                          onPress={() => onCheckPatrolHandler(item)}
                        />
                      );
                    }
                  }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 120,
                    paddingHorizontal: 15
                  }}
                />
              </Grid.Col>
            </Grid.Row>
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
              <Text color="border" size={12} style={{textAlign: 'center'}}>Atau hubungi Admin untuk diberikan akses</Text>
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
