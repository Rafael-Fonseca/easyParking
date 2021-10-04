// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component, useState } from 'react';
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

// const textStyle = {color: '#fFF', fontSize: 15}

const initialState = {
  cpf: '',
  role: [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Usuário',
    value: 'user',
    labelStyle: commonStyles.minorText,

  }, {
    id: '2',
    label: 'Funcionário',
    value: 'employee',
    labelStyle: commonStyles.minorText,

  }, {
    id: '3',
    label: 'Administrador',
    value: 'admin',
    labelStyle: commonStyles.minorText,

  }],

}


export default class GerUsers extends Component {

  state = {
    ...initialState
  }

  onPress = role => this.setState({ role });

  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }
  confirm = () => {
    Alert.alert('Altere o usuário')
    this.props.navigation.navigate('AdmLogged')
  }

  render() {
    let selected_role = this.state.role.find(e => e.selected == true);
    selected_role = selected_role ? selected_role.value : null;
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            GERENCIAR USUÁRIOS
          </Text>

          <TextInput placeholder='CPF'
            value={this.state.cpf}
            style={commonStyles.input}
            onChangeText={cpf => this.setState({ cpf })} />

          <Text style={[commonStyles.title, { marginTop: '3%' }]}>
            FUNÇÃO?
          </Text>

          <View>
            <RadioGroup
              radioButtons={this.state.role}
              onPress={this.onPress}
              containerStyle = {commonStyles.radiusContainer}
            />
          </View>

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back}/>
            <Buttons next white title='Confirmar' onClick={this.confirm}/>
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
