import { StyleSheet, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import Text from './Text'
import { colors, fonts } from '@styles'
import { Gap, Icon } from '@themes'

const Input = ({value, label, iconLeft, iconRight, inputRef, secure, onClearText, invalidMessage, style, ...props}) => {
  const [enableSecure, setEnableSecure] = useState(secure);

  return (
    <>
      {label && <Text type="OpenSansBold" size={12}>{label}</Text>}
      <Gap height={5} />
      <View style={styles.inputContainer}>
        {iconLeft}
        <View style={{flex: 1}}>
          <TextInput
            value={value}
            ref={inputRef}
            secureTextEntry={enableSecure}
            style={[styles.input, style]}
            placeholderTextColor={colors.border}
            {...props}
          />
        </View>
        {(onClearText && !!value?.length) && <Icon.CrossCircle size={25} strokeColor={colors.border} fillColor={colors.softGray} style={{marginLeft: 5, marginRight: 10}} onPress={() => onClearText("")} />}
        {secure && enableSecure && <Icon.VisibleEye size={25} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{marginLeft: 5, marginRight: 10}} onPress={() => setEnableSecure(!enableSecure)} />}
        {secure && !enableSecure && <Icon.InvisibleEye size={25} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{marginLeft: 5, marginRight: 10}} onPress={() => setEnableSecure(!enableSecure)} />}
        {iconRight}
      </View>
      {invalidMessage?.length !== 0 && <Text size={12} color="secondary">{invalidMessage}</Text>}
    </>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
  },
  input: {
    borderRadius: 4,
    paddingHorizontal: 15,
    fontFamily: fonts.type.OpenSansSemiBold,
    fontSize: fonts.size.value(12),
    color: colors.font
  }
})