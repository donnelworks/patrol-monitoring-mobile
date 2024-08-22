import { StyleSheet, ScrollView } from 'react-native'
import React, {useState, useRef} from 'react'
import { Gap, Screen, Icon } from '@themes'
import { Alert, Button, Input, Text } from '@components'
import { colors } from '@styles'
import { login } from '@services'

const Login = ({navigation}) => {
  const [form, setForm] = useState({username: "", password: ""});
  const [formValidation, setFormValidation] = useState({username: "", password: ""});
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = {
    password: useRef()
  };

  const updateText = (text, input) => {
    setForm({
      ...form,
      [input]: text,
    });
  };

  const onLoginHandler = async () => {
    try {
      setLoading(!loading);
      setAlertMessage("");
      setFormValidation({...formValidation, username: "", password: ""});

      const res = await login(form);

      if (res.success) {
        setAlertMessage("");
        setForm({...form, username: "", password: ""});
        setFormValidation({...formValidation, username: "", password: ""});
        navigation.replace('home');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.statusMessage === "FORM_VALIDATION_ERROR") {
        setFormValidation({
          ...formValidation,
          username: error.data?.username || "",
          password: error.data?.password || ""
        });
      }
      if (error.statusMessage === "AUTH_ERROR") {
        setAlertMessage(error.data);
      }
    }
  }

  return (
   <Screen>
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
    }}>
      <Screen.Section alignItems="center">
          <Text size={45} color="primary" type="OpenSansExtraBold">SIJAGA</Text>
      </Screen.Section>
      <Gap height={50} />
      <Screen.Section padding='0 30 0 30'>
        {alertMessage.length > 0 && <Alert message={alertMessage} />}
        <Input
          value={form.username}
          onChangeText={(text) => updateText(text, 'username')}
          label="Username"
          autoCapitalize='none'
          placeholder="Masukan Username"
          onClearText={(text) => updateText(text, 'username')}
          iconLeft={
            <Icon.UserCircle size={25} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{marginLeft: 10, marginRight: 5}} />
          }
          returnKeyType="next"
          onSubmitEditing={() => inputRef?.password?.current?.focus()}
          invalidMessage={formValidation.username}
        />
        <Gap height={10} />
        <Input
          secure
          inputRef={inputRef.password}
          value={form.password}
          onChangeText={(text) => updateText(text, 'password')}
          label="Password"
          autoCapitalize='none'
          placeholder="Masukan Password"
          onClearText={(text) => updateText(text, 'password')}
          iconLeft={
            <Icon.Lock size={25} strokeColor={colors.primary} fillColor={colors.softPrimary} style={{marginLeft: 10, marginRight: 5}} />
          }
          invalidMessage={formValidation.password}
        />
        <Gap height={30} />
        <Button title="Login" onPress={onLoginHandler} disabled={loading} loadingBtn={loading} />
      </Screen.Section>
    </ScrollView>
   </Screen>
  )
}

export default Login

const styles = StyleSheet.create({})