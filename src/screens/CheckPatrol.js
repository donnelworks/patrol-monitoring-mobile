import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Grid, Icon, Screen } from '@themes'
import { Card, Text } from '@components'
import { colors } from '@styles'
import { timeFormat } from '@helpers'

const CheckPatrol = ({navigation, route}) => {

  const params = route?.params;

  return (
    <Screen scrollable>
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
              <Text>{params?.date}</Text>
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
              <Icon.Flag size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
            </Grid.Col>
            <Grid.Col xs={10}>
              <Text>{params?.unit_short_name}</Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col xs={2}>
              <Icon.UserCircle size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
            </Grid.Col>
            <Grid.Col xs={10}>
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
          {/* <Grid.Row rowStyles={{paddingBottom: 5}}>
            <Grid.Col xs={2}>
              <Icon.WatchTime size={20} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{alignSelf: 'center'}} />
            </Grid.Col>
            <Grid.Col xs={10}>
              <Text>{timeFormat(params?.time)}</Text>
            </Grid.Col>
          </Grid.Row> */}
        </Card>
      </Screen.Section>
    </Screen>
  )
}

export default CheckPatrol

const styles = StyleSheet.create({})