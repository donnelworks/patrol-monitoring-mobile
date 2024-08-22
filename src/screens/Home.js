import {StyleSheet, ActivityIndicator, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ActivityList, Text} from '@components';
import {Screen, Grid, Icon, Gap} from '@themes';
import { colors } from '@styles';
import { getActivity, logout } from '@services';
import { fineLocationPermission } from '@helpers';

const Home = ({navigation}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const res = await getActivity();

      if (res.success) {
        setLoading(false);
        setActivities(res?.data);
      }
    } catch (error) {
      if (error.statusMessage === "SESSION_ERROR") {
        await logout();
        navigation.replace('login');
      }
    }
  }

  const onCheckPatrolHandler = async (item) => {
    try {
      const result = await fineLocationPermission();
      console.log(result);
      
      // navigation.navigate('checkPatrol');
    } catch (error) {
      
    }
  }

  if (loading) {
    return (
      <Screen justifyContent="center">
        <Screen.Section>
          <ActivityIndicator size="large" color={colors.secondary} />
        </Screen.Section>
      </Screen>
    )
  }

  return (
    <Screen>
      {/* Header */}
      <Screen.Section padding="0 15 0 15">
        <Grid.Row>
          <Grid.Col xs={12}>
            <Text type="OpenSansExtraBold" size={28} color="primary">
              SIJAGA
            </Text>
          </Grid.Col>
        </Grid.Row>
      </Screen.Section>

      {/* Title List */}
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

      {!!activities.length && <Screen.Section>
        <Grid.Row>
          <Grid.Col xs={12}>
            <FlatList
              data={activities}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <ActivityList 
                    time={item.time}
                    activity={item.activity}
                    region={item.region_name}
                    status={item.status_checkin}
                    onPress={onCheckPatrolHandler}
                  />
                );
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 20,
                paddingHorizontal: 15
              }}
            />
          </Grid.Col>
        </Grid.Row>
      </Screen.Section>}

      {!activities.length && <Screen.Section>
        <Grid.Row>
          <Grid.Col xs={12}>
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text size={12} type="OpenSansSemiBold" color="border">Tidak ada kegiatan</Text>
            </View>
          </Grid.Col>
        </Grid.Row>
      </Screen.Section>}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
