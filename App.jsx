// In App.js in a new project
import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuDrawer from './navigation/MenuDrawer'


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MenuDrawer/>
    </NavigationContainer>
  );
}