import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import { Screen } from '@themes';
import { Text } from '@components';
import { logout, sessionCheck } from '@services';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    sessionCheckHandler();
  }, []);

  const sessionCheckHandler = async () => {
    try {
      const res = await sessionCheck();
      if (res.success) {
        navigation.replace('home');
      }
    } catch (error) {
      if (error.statusMessage === "SESSION_ERROR") {
        await logout();
        navigation.replace('login');
      }
    }
  };

  return (
    <Screen justifyContent="center">
        <Screen.Section alignItems="center">
            <Text size={45} color="primary" type="OpenSansExtraBold">SIJAGA</Text>
        </Screen.Section>
    </Screen>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
