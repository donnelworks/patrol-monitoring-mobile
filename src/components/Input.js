import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Input = () => {
  return (
    <View>
      <TextInput 
        placeholder="Username"
        style={{borderWidth: 1}}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({})