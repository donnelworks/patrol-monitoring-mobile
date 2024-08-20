import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login} from '@screens';
import {colors, fonts} from '@styles';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="actionSheet"
        component={ActionSheet}
        options={{
          title: 'Action Sheet',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: fonts?.type?.OpenSansBold,
    fontSize: fonts?.size?.value(16),
    color: colors?.primary,
  }
});
