import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigations/RootNavigation';
import {SheetProvider} from 'react-native-actions-sheet';
import './sheets/sheets.js';

const App = () => {
  return (
    <NavigationContainer>
      <SheetProvider>
        <RootNavigation />
      </SheetProvider>
    </NavigationContainer>
  );
};

export default App;
