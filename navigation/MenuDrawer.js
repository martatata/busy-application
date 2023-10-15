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
import { AuthConsumer } from '../Autentication/ProvedorAutenticacao';

function CustomDrawerContent({ navigation }, props) {

    return (

        <DrawerContentScrollView>
            <DrawerItem label="Home" onPress={() => {
                navigation.navigate('Home');
            }} />
            <DrawerItem label="Login" onPress={() => {
                navigation.navigate('Login');
            }} />
                        {props.user.isUsuarioAutenticado ?

            <DrawerItem label="Details" onPress={() => {
                navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' });
            }} /> : false}
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

function MenuDrawer(props) {
    console.log("prooops", JSON.stringify(props))
    var usuarioContext ={}
    var usuario = {
        nome: props.user.nome,
        cpf: props.user.cpf,
        isUsuarioAutenticado: props.isUsuarioAutenticado,
        isUsuarioAutorizado: props.isUsuarioAutorizado
    
      }
      console.log("usuario:", JSON.stringify(usuario))
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} user={usuario} />}>
            
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} /> 
            <Drawer.Screen name="Payment" component={PaymentScreen} />
        </Drawer.Navigator>
    );
}export default () => (
    <AuthConsumer>
        {/* {(context) => (<MenuDrawer user={context.user.cpf}></MenuDrawer>)} */}
        {(context) => (console.log(context.user.cpf))}

    </AuthConsumer>

)
