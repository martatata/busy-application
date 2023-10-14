// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../src/DetailsScreen';
import HomeScreen from '../src/HomeScreen';
import LoginScreen from '../src/LoginScreen';
import PaymentScreen from '../src/PaymentScreen';


const Stack = createNativeStackNavigator();

function StackNavigator() {

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
     
      </TouchableOpacity>    
    )
  }

  return (
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Parameter' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login Parameter' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment Parameter' }}
      />
       <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ itemId: 42 }}
      />
      </Stack.Navigator>
  );
}

export default StackNavigator;