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
import { useNavigation } from '@react-navigation/native';

function CustomDrawerContent({ user, isAuthenticated, encerrarSessao }) {
    console.log("props2", user)
    const navigation = useNavigation();

    return (

        <DrawerContentScrollView>
            {/* ESSA SESSÃO VAI APARECER APENAS PARA TODOS OS USUÁRIO */}

            <DrawerItem label="Home" onPress={() => {
                navigation.navigate('Home');
            }} />

            {/* ESSA SESSÃO VAI APARECER APENAS PARA USUARIOS AUTENTICADOS */}
            {isAuthenticated ?
                <View>
                    <DrawerItem label="Details" onPress={() => {
                        navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' });
                    }} />
                    <DrawerItem label="Payment" onPress={() => {
                        // Navigate using the `navigation` prop that you received
                        navigation.navigate('Payment');
                    }} />
                    <DrawerItem label="Logout" onPress={() => {
                     
                        encerrarSessao()
                        // Navigate using the `navigation` prop that you received
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }}
                        
                    /></View>

                :
                // ESSA SESSÃO VAI APARECER APENAS PARA USUARIOS NÃO AUTENTICADOS

                <DrawerItem label="Login" onPress={() => {
                    navigation.navigate('Login');

                }} />
            }


        </DrawerContentScrollView>


    );
}

const Drawer = createDrawerNavigator();

function MenuDrawer(props) {
    console.log("props1", props)
    return (
        <Drawer.Navigator drawerContent={() => <CustomDrawerContent {...props} user={props.user} isAuthenticated={props.isAuthenticated} encerrarSessao={props.encerrarSessao} />}>

            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />
        </Drawer.Navigator>
    );
} export default () => (
    <AuthConsumer>
        {(context) => (<MenuDrawer user={context.user.cpf} isAuthenticated={context.isAuthenticated} isUsuarioAutorizado={context.autorizado} encerrarSessao={context.encerrarSessao}></MenuDrawer>)}

    </AuthConsumer>

)
