import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableOpacity, Animated, Easing } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthConsumer } from '../Autentication/ProvedorAutenticacao';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CadastroScreen(props) {
    const [mensagemErro, setMensagemErro] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState(null);

    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const inputRefs = {
        inputCpf: useRef(null),
        inputCelular: useRef(null),
        inputNome: useRef(null),
        inputSenha: useRef(null),
        inputSenhaConfirmacao: useRef(null),
        input1: useRef(null),
    };

    const navigation = useNavigation();
    const shakeAnimation = new Animated.Value(0);


    const handleFocus = () => {
        // Remover o estilo de erro e parar a animação quando o campo de entrada ganha foco
        setIsValid(true);
        setIsFocused(true);
        setIsFocused(false);

        shakeAnimation.setValue(0);
    };

    const handleBlur = () => {
        // Restaurar o estilo da borda original quando o campo de entrada perde o foco
    };

    handleSenhaChange = (text) => {
        setMensagemErro(null)
        setSenha(text);
    }

    handleCPFChange = (text) => {

        setMensagemErro(null)

        if (text.length === 14) {
            // Quando o usuário digitar o 11º dígito, pule para o próximo campo
            inputRefs.inputCelular.focus();
        }
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
    cadastrar = async (cpf, senha, nome, celular, senhaConfirmacao) => {
        setMensagemErro(null);
        setMensagemSucesso(null)
        setMensagemErro(null)
        if (nome == '' || nome == null) {
            setMensagemErro("Nome deve ser informado!")
            return true;
        } else if (celular == '' || celular == null) {

            setMensagemErro("Celular deve ser informado!")
            return true;

        } else if (cpf == '' || cpf == null) {

            setMensagemErro("CPF deve ser informado!")
            return true;
        } else if (senha == '' || senha == null) {

            setMensagemErro("Senha deve ser informada!")
            return true;

        } else if (senhaConfirmacao == '' || senhaConfirmacao == null) {

            setMensagemErro("A confimação de senha deve ser informada!")
            return true;

        } else {



            await axios.post("https://busy-apis-3cc19afe7f78.herokuapp.com/usuario", {
                cpf: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                senha: senha,
                senhaConfirm: senhaConfirmacao,
                celular: celular,
                aprovado: 2,
                hierarquia: 0,
                nomeCompleto: nome
            }).then(response => {
                try {

                    this.redirecionar()

                } catch (error) {
                    Alert("Erro ao Redirecionar: ", error)

                }


            }).catch(error => {

                setMensagemErro(error.response.data.error)

            })

        }


    }

    redirecionar = async () => {

        axios.post("https://busy-apis-3cc19afe7f78.herokuapp.com/authenticate", {
            cpf: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
            senha: senha,
        }).then(response => {
            AsyncStorage.setItem('app-token', response.data.token)
            props.iniciarSessao()
            navigation.navigate('Home')

        }).catch(error => {
            setMensagemErro(error)
        })
    }

    handleCelularFormat = (text) => {
        // Remove qualquer caractere não numérico do texto

        if (text.length === 17) {
            // Quando o usuário digitar o 11º dígito, pule para o próximo campo
            inputRefs.inputNome.focus();
        }
        const formattedText = text.replace(/[^\d]/g, '');

        // Aplicar a máscara para formatar o número
        let formattedPhoneNumber = '';
        if (formattedText.length > 0) {
            formattedPhoneNumber = `(${formattedText.substring(0, 2)}`;
        }
        if (formattedText.length > 2) {
            formattedPhoneNumber += `) ${formattedText.substring(2, 3)}`;
        }
        if (formattedText.length > 3) {
            formattedPhoneNumber += ` ${formattedText.substring(3, 7)}`;
        }
        if (formattedText.length > 7) {
            formattedPhoneNumber += `-${formattedText.substring(7, 11)}`;
        }
        setCelular(formattedPhoneNumber);
    };


    return (

        <ScrollView >


            <View style={styles.container}>
                <Text>CPF</Text>
                <Animated.View
                    style={[
                        styles.inputContainer,
                        !isValid && !isFocused && styles.invalidInputContainer,
                        {
                            transform: [
                                {
                                    translateX: shakeAnimation,
                                },
                            ],
                        },
                    ]}
                >
                    <TextInput
                        ref={(ref) => (inputCpf = ref)}
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        onChangeText={this.handleCPFChange}
                        value={cpf}
                        keyboardType="numeric" // Teclado numérico
                        maxLength={14} // 11 dígitos e 3 caracteres de formatação (pontos e traço)
                        autoFocus={true}

                    />
                </Animated.View>
                <Text>Celular</Text>
                <TextInput
                    style={styles.input}
                    ref={(ref) => (inputRefs.inputCelular = ref)}
                    keyboardType="phone-pad"
                    placeholder="Digite seu celular"
                    onChangeText={this.handleCelularFormat}
                    value={celular}
                    returnKeyType="next"
                    onSubmitEditing={() => { inputRefs.inputNome.focus(); }}
                    maxLength={17} />

                <Text>Nome</Text>
                <TextInput
                    style={styles.input}
                    ref={(ref) => (inputRefs.inputNome = ref)}
                    returnKeyType="next"
                    onSubmitEditing={() => { inputRefs.inputSenha.focus(); }}
                    placeholder="Digite seu nome"
                    onChangeText={text => setNome(text)}
                    value={nome}

                />
                <Text>Senha</Text>
                <TextInput
                    ref={(ref) => { inputRefs.inputSenha = ref; }}
                    style={styles.input}
                    placeholder="Digite uma senha"
                    secureTextEntry={true}
                    returnKeyType="next"
                    onSubmitEditing={() => { inputRefs.inputSenhaConfirmacao.focus(); }}
                    onChangeText={text => setSenha(text)}
                    value={senha}
                />

                <Text>Confirmação de Senha</Text>
                <TextInput
                    ref={(ref) => { inputRefs.inputSenhaConfirmacao = ref; }}
                    style={styles.input}
                    placeholder="Digite a senha novamente"
                    secureTextEntry={true}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.handleLogin }}
                    onChangeText={text => setSenhaConfirmacao(text)}
                    value={senhaConfirmacao}
                />
                <Text style={styles.mensagemDeErroField}>{mensagemErro}</Text>

                <Button
                    title="Cadastrar"
                    onPress={() => { cadastrar(cpf, senha, nome, celular, senhaConfirmacao, props) }}
                    color="#3F51B5" // Cor azul
                />

                <Spacer />

                <Button
                    title="Ja tenho cadastro"
                    onPress={() => navigation.navigate('Login')}
                    color="#9C27B0" // Cor roxa
                />

                <Spacer />



            </View>
        </ScrollView>


    );
} export default () => (
    <AuthConsumer>
        {(context) => (<CadastroScreen iniciarSessao={context.iniciarSessao} />)}
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

    //aq

});