import { Text as RNText } from 'react-native'
import React from 'react'
import { colors, fonts } from '@styles'

const Text = ({children, type, size, color, style, ...props}) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[{
          fontFamily: type ? fonts?.type?.[`${type}`] : fonts?.type?.OpenSansRegular,
          fontSize: size ? fonts?.size?.value(size) : fonts?.size?.value(14),
          color: color ? colors?.[`${color}`] : colors?.font,
      }, style]}
      {...props}
    >
      {children}
    </RNText>
  )
}

export default Text