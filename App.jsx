// In App.js in a new project
import 'react-native-gesture-handler';

import React , { useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuDrawer from './navigation/MenuDrawer'

// importações referentes a autenticação
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import ProvedorAutenticacao from './Autentication/ProvedorAutenticacao'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ProvedorAutenticacao>
        <NavigationContainer>
        <PersistGate persistor={persistor}>
          <MenuDrawer />
          </PersistGate>
        </NavigationContainer>
      </ProvedorAutenticacao>
    </Provider>
  );
} 

AppRegistry.registerComponent('busy', () => App);
