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
} from "react-native"
import RadioGroup from 'react-native-radio-buttons-group'
import Buttons from '../pieces/Buttons';

const initialState = {
  cnpj: '',
  nme_company: '',
}


export default class CreateCompany extends Component {

  state = {
    ...initialState
  }

  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }
  confirm = () => {
    Alert.alert('Cadastre a empresa no BD')
    this.props.navigation.navigate('AdmLogged')
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            Cadastrar Empresa
          </Text>

          <TextInput placeholder='CNPJ'
            value={this.state.cnpj}
            style={commonStyles.input}
            onChangeText={cnpj => this.setState({ cnpj })} />

          <TextInput placeholder='Nome da empresa'
            value={this.state.nme_company}
            style={[commonStyles.input, {marginTop: '6%'}]}
            onChangeText={nme_company => this.setState({ nme_company })} />

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back} />
            <Buttons next white title='Confirmar' onClick={this.confirm} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
