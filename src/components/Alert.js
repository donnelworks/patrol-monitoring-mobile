import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'
import { colors } from '@styles'
import { Grid, Icon } from '@themes'

const Alert = ({message, type}) => {
  return (
    <View style={styles.alertContainer(type)}>
      <Grid.Row>
        <Grid.Col xs={1}>
          <Icon.Info size={20} fillColor={type === "success" ? colors.softSuccess : colors.softSecondary} strokeColor={type === "success" ? colors.success : colors.secondary} />
        </Grid.Col>
        <Grid.Col xs={11}>
          <Text color={type === "success" ? "success" : "secondary"} type="OpenSansSemiBold" size={12}>{message}</Text>
        </Grid.Col>
      </Grid.Row>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    alertContainer: (type) => ({
      // flexWrap: 'wrap',
      // flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      borderColor: type === "success" ? colors.success : colors.secondary,
      borderWidth: 1,
      backgroundColor: type === "success" ? colors.softSuccess : colors.softSecondary,
      padding: 10,
      marginBottom: 10,
    })
})