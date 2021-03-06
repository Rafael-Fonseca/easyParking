// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native"

import Buttons from '../pieces/Buttons';
import Label from '../pieces/Label';

const initialState = {
  cnpj: '',
}


export default class GerCompanies extends Component {

  state = {
    ...initialState
  }

  createCompany = () => {
    this.props.navigation.navigate('CreateCompany')
  }
  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }
  confirm = async () => {
    await axios.post(`${server}/company_read`, {
      cnpj: this.state.cnpj
    }).then(res => {
      if(res.data !== '' && res.data.is_active === true){
        this.props.navigation.navigate('UpdateCompany', res.data)
      }else{
        Alert.alert('CNPJ inválido!', 'O CNPJ informado não foi encontrado na base de dados.')
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

        <TouchableOpacity onPress={this.createCompany}>
          <Label opacity='1' black title='Inserir nova empresa' />
        </TouchableOpacity>

          <Text style={commonStyles.title}>
            Gerenciar empresas
          </Text>

          <TextInput placeholder='CNPJ'
            value={this.state.cnpj}
            style={commonStyles.input}
            keyboardType='numeric'
            onChangeText={cnpj => this.setState({ cnpj })} />

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back} />
            <Buttons next white title='Confirmar' onClick={this.confirm} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
