import {StyleSheet, View} from 'react-native';
import React from 'react';
import Card from './Card';
import { Gap, Grid, Icon } from '@themes';
import Text from './Text';
import { colors } from '@styles';

const ActivityList = ({time, activity, region, status, onPress}) => {
  return (
    <>
      <Card shadow onPress={onPress}>
        <Grid.Row>
          <Grid.Col xs={3}>
            <Text type="OpenSansSemiBold" size={12} color="gray">
              Jam
            </Text>
            <Text type="OpenSansExtraBold" size={20} color="primary">
              {time}
            </Text>
          </Grid.Col>
          <Grid.Col xs={7}>
            <Text type="OpenSansBold" size={14} numberOfLines={1}>
              {activity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon.Location
                size={16}
                strokeColor={colors.primary}
                fillColor={colors.softPrimary}
              />
              <Gap width={3} />
              <Text size={10} numberOfLines={1}>
                {region}
              </Text>
            </View>
          </Grid.Col>
          <Grid.Col xs={2}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon.Circle
                  size={20}
                  strokeColor={status === "0" ? colors.border : status === "1" ? colors.secondary : colors.success}
                  fillColor={status === "0" ? "white" : status === "1" ? colors.softSecondary : colors.softSuccess}
                />
            </View>
          </Grid.Col>
        </Grid.Row>
      </Card>
      <Gap height={10} />
    </>
  );
};

export default ActivityList;

const styles = StyleSheet.create({});
