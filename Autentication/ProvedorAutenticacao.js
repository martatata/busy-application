import React from 'react';

import axios from 'axios';
import AuthService from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;


async function pegarTokenCpf() {
    let context = this;
    try {
        let value = await AsyncStorage.getItem('app-token');
        if (value != null) {

            var decoded = jwt_decode(value);

            let user = { "cpf": decoded.sub, "nome": "Bem vindo" }

            return user;
        } else {

            return false;
        }
    } catch (error) {

    }
}


class ProvedorAutenticacao extends React.Component {

    state = {
        isAuthenticated: AuthService.isUsuarioAutenticado(),
        user: { "nome": '', cpf: "" },

    }

    componentDidMount = () => {
        this.iniciarSessao()
        this.definicaoUser()

    }

    definicaoUser = () => {
        pegarTokenCpf().then(result => this.setState({ user: result }, () => {
            if (this.state.user.cpf != null && this.state.user.cpf != ''){
                this.setState({ isAuthenticated: true })

            } else {
                this.setState({ isAuthenticated: false })

            }
        }));
    }

    iniciarSessao = () => {
        this.definicaoUser()
        // this.setState({ autorizado: AuthService.isUsuarioAutorizado() })
        //       this.setState({ user: AuthService.userId() }, () => {
        this.setState({ autorizado: '1' })

        // funcionarioAutorizacao(this.state.user).then(result => this.setState({autorizado : result}, ()=>{

        // }));

        //   })
        //


    }

    encerrarSessao = () => {

        AsyncStorage.clear();
        this.setState({ isAuthenticated: false })

    }

    pegarAutorizacoes = (id) => {

        return id;

    }




    render() {
        const contexto = {
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao,
            pegarAutorizacoes: this.pegarAutorizacoes,
            timeLineMotoristaHandler: this.timeLineMotoristaHandler,
            timeLineTransportadoraHandler: this.timeLineTransportadoraHandler,
            isAuthenticated: this.state.isAuthenticated,
            autorizado: this.state.autorizado,
 
            user: this.state.user,
            timeLineCadastroMotorista: this.state.timeLineCadastroMotorista,
            timeLineCadastroTransportadora: this.state.timeLineCadastroTransportadora,
            transformY: this.state.transformY
        }
        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>

        )
    }

}

export default ProvedorAutenticacao;