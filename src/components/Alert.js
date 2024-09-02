import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'
import { colors } from '@styles'

const Alert = ({message, type}) => {
  return (
    <View style={styles.alertContainer(type)}>
      <Text color={type === "success" ? "success" : "secondary"} type="OpenSansSemiBold" size={12}>{message}</Text>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    alertContainer: (type) => ({
        borderRadius: 8,
        borderColor: type === "success" ? colors.success : colors.secondary,
        borderWidth: 1,
        backgroundColor: type === "success" ? colors.softSuccess : colors.softSecondary,
        padding: 10,
        marginBottom: 10,
    })
})