import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'
import { colors } from '@styles'

const Alert = ({message}) => {
  return (
    <View style={styles.alertContainer}>
      <Text color="secondary" type="OpenSansSemiBold" size={12}>{message}</Text>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    alertContainer: {
        borderRadius: 8,
        borderColor: colors.secondary,
        borderWidth: 1,
        backgroundColor: colors.softSecondary,
        padding: 10,
        marginBottom: 10,
    }
})