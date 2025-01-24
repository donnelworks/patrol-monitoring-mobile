import {StyleSheet, ImageBackground, Image, ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Images, Screen } from '@themes';
import { Text } from '@components';
import { logout, sessionCheck } from '@services';
import { getAppVersion } from '@helpers';
import { colors } from '@styles';
import { SheetManager } from 'react-native-actions-sheet';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionCheckHandler();
  }, []);

  const sessionCheckHandler = async () => {
    try {
      setLoading(true);
      const res = await sessionCheck();
      if (res.success) {
        navigation.replace('home');
      }
    } catch (error) {
      setLoading(false);
      if (error.statusMessage === "UPDATE_APP_VERSION") {
        await logout();
        SheetManager.show('app-update-sheet');
        navigation.replace('login');
      }
      if (error.statusMessage === "SESSION_ERROR") {
        await logout();
        navigation.replace('login');
      }
    }
  };

  return (
    <Screen>
      <ImageBackground fadeDuration={0} source={Images.SplashScreenBackground} resizeMode='cover' style={styles.background}>
        <Image source={Images.SplashScreenLogo} resizeMode="contain" style={styles.logo} />
        <View style={styles.loadingContainer}>
          {loading && (
            <ActivityIndicator size="large" color={colors.secondary} />
          )}
        </View>
        <Text color='white' style={styles.textFooter}>Ver. {getAppVersion()}</Text>
      </ImageBackground>
    </Screen>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '90%'
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center'
  },
  textFooter: {
    marginVertical: 20
  }
});
