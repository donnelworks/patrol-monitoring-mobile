import { SafeAreaView, View, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '@styles'

const Screen = ({
  style,
  backgroundColor,
  justifyContent,
  alignItems,
  children
}) => {
  return (
    <SafeAreaView style={[{
        flexGrow: 1,
        justifyContent,
        alignItems,
        backgroundColor: backgroundColor ? colors?.[`${backgroundColor}`] : colors?.light,
      }, style]}>
        {children}
    </SafeAreaView>
  )
}

const Section = ({
  style,
  justifyContent,
  alignItems,
  padding = "0 0 0 0",
  margin = "0 0 0 0",
  children
}) => {
  return (
    <View style={[{
        justifyContent,
        alignItems,
        paddingTop: parseInt(padding?.split(" ")[0]),
        paddingRight: parseInt(padding?.split(" ")[1]),
        paddingBottom: parseInt(padding?.split(" ")[2]),
        paddingLeft: parseInt(padding?.split(" ")[3]),
        marginTop: parseInt(margin?.split(" ")[0]),
        marginRight: parseInt(margin?.split(" ")[1]),
        marginBottom: parseInt(margin?.split(" ")[2]),
        marginLeft: parseInt(margin?.split(" ")[3]),
    }, style]}>
      {children}
    </View>
  )
}

Screen.Section = Section;

export default Screen;