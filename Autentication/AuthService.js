
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

    
// Função pegarToken() é uma função assíncrona que acessa o repositório AsyncStorage e retorna true caso esteja logado
async function pegarToken(){
    let context = this;
    try {
       let value = await AsyncStorage.getItem('app-token');
       if (value != null){
          return true;
       } else {

        return false;
      }
    } catch (error) {

    }
}

export default class AuthService {

    // Função isUsuarioAutenticado() é responsável por acessar o repositório local AsyncStorage, para ver se existe usuario logado
    static isUsuarioAutenticado = () => {

        var tokenResultado = pegarToken();
        pegarToken().then(result => tokenResultado = result);

        return tokenResultado;
    }

    // Função userId() é responsável por acessar o repositório local AsyncStorage, decriptografar o token e pegar o CPF logado
    static userId() {
        // var token = pegarTokenCpf();
        let user = { "cpf": '11122233355', "nome": "Maria Luiza"}
    
        if (user != null) {
            return user;
        } else {
            return false;
        }
    }



}

