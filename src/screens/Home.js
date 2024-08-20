import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {ActivityList, Text} from '@components';
import {Screen, Grid, Icon, Gap} from '@themes';
import {colors} from '@styles';

const Home = ({navigation}) => {
  const activities = [
    {
      id: 1,
      time: "13:30",
      activity: "Patroli di Jembatan Baru, Cengkareng",
      region: "Cengkareng",
      status: "0",
      onPress: () => {},
    },
    {
      id: 2,
      time: "14:00",
      activity: "Patroli di Terminal Kalideres",
      region: "Kalideres",
      status: "0",
      onPress: () => {},
    },
  ];

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

      <Screen.Section>
        <Grid.Row>
          <Grid.Col xs={12}>
            <FlatList
              data={activities}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <ActivityList time={item.time} activity={item.activity} region={item.region} status={item.status} />
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
      </Screen.Section>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
