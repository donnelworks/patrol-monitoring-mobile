import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import { colors } from '@styles'

const Card = ({children, shadow, shadowColor = colors.shadow, style, onPress}) => {
  return (
    <Shadow
      disabled={!shadow}
      distance={20}
      startColor={shadowColor ? shadowColor + '80' : shadowColor}
      endColor='#ffffff00'
      offset={[0, 5]}
      style={{
        borderRadius: 8,
      }}
      stretch
    >
      <TouchableWithoutFeedback disabled={!onPress} onPress={onPress}>
        <View style={[styles.container, style]}>
            {children}
        </View>
      </TouchableWithoutFeedback>
    </Shadow>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 8,
    },
})