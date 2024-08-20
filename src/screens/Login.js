import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Gap, Screen } from '@themes'
import { Input, Text } from '@components'

const Login = () => {
  return (
   <Screen justifyContent="center">
    <Screen.Section alignItems="center">
        <Text size={45} color="primary" type="OpenSansExtraBold">SIJAGA</Text>
    </Screen.Section>
    <Gap height={50} />
    <Screen.Section padding='0 15 0 15'>
      <Input
        outline
        animationLabel={true}
        autoCapitalize="none"
        label="Kode Pengguna"
        // value={form.kode}
        // iconLeft="account-outline"
        // onChangeText={val => changeText(val, 'kode')}
        returnKeyType="next"
        // onSubmitEditing={() => passRef?.current?.focus()}
      />
    </Screen.Section>
   </Screen>
  )
}

export default Login

const styles = StyleSheet.create({})