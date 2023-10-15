import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthConsumer } from '../Autentication/ProvedorAutenticacao';
import messaging from '@react-native-firebase/messaging';


export function LoginScreen(props) {
    const [mensagemErro, setMensagemErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation();

    //Essa função é responsável por pegar o token FCM do celular gerado pelo firebase e colocar no banco de dados pessoal, para identificação 
    //de usuários por FCM.
    // cadastrarToken = async (cpf) => {
    //     console.log("4444")

    //     try {
    //         console.log("5555")

    //         // Ignore all that permission request stuff. You need to do it but it is UNRELATED to tokens.
    //         // Handle your permissions separately. Ideally with react-native-permissions

    //         // From the example https://rnfirebase.io/messaging/server-integration#saving-tokens
    //         const token = await messaging().getToken();
    //         console.log("121212")

    //         //Atualiza o banco de dados com o token e usuario
    //         await axios.post(`https://busy-apis-3cc19afe7f78.herokuapp.com/notificacao-firebase`, {
    //             usuario: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
    //             chaveFirebase: token
    //         })
    //             .then(response => {
    //                 console.log("6666")

    //             }).catch(error => {
    //                 console.log("7777")

    //                 setMensagemErro(error)
    //             })

    //         // Listen to whether the token changes
    //         let tokenRefreshListenerUnsubscriber = messaging().onTokenRefresh(token => {
    //             axios.post(`https://busy-apis-3cc19afe7f78.herokuapp.com/notificacao-firebase`, {
    //                 usuario: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
    //                 chaveFirebase: token
    //             })
    //                 .then(response => {

    //                 }).catch(error => {
    //                     setMensagemErro(error)
    //                 })

    //         });
    //     } catch (e) {
    //         console.error('token registration failed?', e);
    //     }
    // }

    handleLogin = async () => {
        setCarregando(true)
        setMensagemErro(null)

        if (cpf == '' || cpf == null) {

            setMensagemErro("CPF deve ser informado!")
            return true;
        } else if (senha == '' || senha == null) {

            setMensagemErro("Senha deve ser informada!")
            return true;
        } else {
            console.log("111")
            await axios.post("https://busy-apis-3cc19afe7f78.herokuapp.com/authenticate", {
                cpf: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                senha: senha,
            }).then(response => {
                console.log("2222")

                // consultarAutorizacoes(cpf, response.data.token).then(result => {
                // }).catch(error => { });
                AsyncStorage.setItem('app-token', response.data.token)
                props.iniciarSessao()
                //this.cadastrarToken(cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""))
                this.redirecionar()

                setCarregando(false)

            }).catch(error => {
                console.log("333")

                setMensagemErro(error)

            })

        }


    }

    handleSenhaChange = (text) => {
        setMensagemErro(null)
        setSenha(text);
        console.log(senha)
    }

    handleCPFChange = (text) => {
        setMensagemErro(null)

        // Remove todos os caracteres não numéricos
        text = text.replace(/\D/g, '');

        // Formata o CPF (XXX.XXX.XXX-XX)
        if (text.length <= 11) {
            text = text.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        } else {
            // Se o usuário digitar mais de 11 dígitos, limita o CPF a 11 dígitos
            text = text.substring(0, 11);
            text = text.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
        
       setCpf(text);
    };
    redirecionar = () => {
        setCarregando(false)
        navigation.navigate('Home')

    }

    

    return (


        <View style={styles.container}>
            <Text>CPF</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                onChangeText={this.handleCPFChange}
                value={cpf}
                keyboardType="numeric" // Teclado numérico
                maxLength={14} // 11 dígitos e 3 caracteres de formatação (pontos e traço)
            />
            <Text>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                onChangeText={this.handleSenhaChange}
                value ={senha}
            />
            <Text style={styles.mensagemDeErroField}>{mensagemErro}</Text>

            <Button
                title="Login"
                onPress={this.handleLogin}
                color="#3F51B5" // Cor azul
            />

            <Spacer />

            <Button
                title="Esqueci minha senha"
                onPress={this.handleForgotPassword}
                color="#9C27B0" // Cor roxa
            />

            <Spacer />

            <TouchableOpacity
                style={styles.googleButton}
                onPress={this.handleGoogleLogin}
            >
                <Text style={styles.googleButtonText}>Login com o Google</Text>
            </TouchableOpacity>
        </View>

    );
} export default () => (
    <AuthConsumer>
        {(context) => (<LoginScreen iniciarSessao={context.iniciarSessao} />)}
    </AuthConsumer>

)
const Spacer = () => <View style={{ height: 20 }} />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    googleButton: {
        backgroundColor: '#4285F4', // Cor azul do Google
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    googleButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    mensagemDeErroField: {
        color: 'red',
        marginTop: 30,
        justifyContent: 'space-between',
        textAlign: 'center',


    },
});