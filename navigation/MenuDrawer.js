import * as React from 'react';
import { View, Text, Button } from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import PaymentScreen from '../src/PaymentScreen';
import LoginScreen from '../src/LoginScreen';
import HomeScreen from '../src/HomeScreen';
import DetailsScreen from '../src/DetailsScreen';
import StackNavigator from './StackNavigator';

function CustomDrawerContent({ navigation }) {
    var str = JSON.stringify(navigation)
    console.log(str)
    return (

        <DrawerContentScrollView>
            <DrawerItem label="Home" onPress={() => {
                // Navigate using the `navigation` prop that you received
                navigation.navigate('Home');
            }} />
            <DrawerItem label="Details" onPress={() => {
                // Navigate using the `navigation` prop that you received
                navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' });
            }} />
            <DrawerItem label="Payment" onPress={() => {
                // Navigate using the `navigation` prop that you received
                navigation.navigate('Payment');
            }} />
               <DrawerItem label="Logout" onPress={() => {
                // Navigate using the `navigation` prop that you received
                navigation.navigate('Home');
            }} />
        </DrawerContentScrollView>


    );
}

const Drawer = createDrawerNavigator();

export default function MenuDrawer(props) {

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />
            <Drawer.Screen name="Logout" component={LoginScreen} />
        </Drawer.Navigator>
    );
}