import {StyleSheet, View} from 'react-native';
import React from 'react';
import Card from './Card';
import { Gap, Grid, Icon } from '@themes';
import Text from './Text';
import { colors } from '@styles';
import { timeFormat } from '@helpers';

const ActivityList = ({time, activity, region, status, updated, canceled, border, shadow, onPress}) => {
  return (
    <>
      <Card shadow={shadow} onPress={onPress} style={{borderWidth: border ? 1 : 0, borderColor: colors.border, backgroundColor: status === "1" ? colors.secondary : colors.white}}>
        <Grid.Row>
          <Grid.Col xs={3}>
            <Text type="OpenSansSemiBold" size={12} color={status === "1" ? "white" : "gray"}>
              Jam
            </Text>
            <Text type="OpenSansExtraBold" size={20} color={status === "1" ? "white" : "primary"}>
              {timeFormat(time)}
            </Text>
          </Grid.Col>
          <Grid.Col xs={7}>
            <Text type="OpenSansBold" size={14} numberOfLines={1} color={status === "1" ? "white" : "font"}>
              {activity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon.Location
                size={16}
                strokeColor={status === "1" ? colors.white : colors.primary}
                fillColor={status === "1" ? colors.secondary : colors.softPrimary}
              />
              <Gap width={3} />
              <Text size={10} numberOfLines={1} color={status === "1" ? "white" : "font"}>
                {region}
              </Text>
            </View>
            {(updated && !canceled) && (
              <>
                <Gap height={3} />
                <Text type="OpenSansRegularItalic" size={10} numberOfLines={1} color={status === "1" ? "white" : "font"}>
                  Diubah
                </Text>
              </>
            )}
            {canceled && (
              <>
                <Gap height={3} />
                <Text type="OpenSansRegularItalic" size={10} numberOfLines={1} color={status === "1" ? "white" : "secondary"}>
                  Dibatalkan
                </Text>
              </>
            )}
          </Grid.Col>
          <Grid.Col xs={2}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {!canceled ? (
                  status === "1" ? (
                    <Icon.NextArrow
                      size={25}
                      strokeColor="white"
                    />
                  ) : (
                    <Icon.Circle
                      size={20}
                      strokeColor={status === "0" ? colors.border : colors.success}
                      fillColor={status === "0" ? "white" : colors.success}
                    />
                  )
                ) : (
                  <Icon.CrossCircle
                    size={20}
                    strokeColor={colors.border }
                    fillColor="white"
                  />
                )}
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
