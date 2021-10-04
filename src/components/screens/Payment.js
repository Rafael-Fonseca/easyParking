// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native"

import Label from '../pieces/Label'
import Buttons from '../pieces/Buttons';

const initialState = {
  cvv: '',
}


export default class Payment extends Component {

  state = {
    ...initialState
  }


  pass = () => {
    Alert.alert('Apertou!')
  }

  render() {
    return (
      <SafeAreaView style={[commonStyles.background, { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Label opacity='1' black title='Selecione o cartão:' />

          <Label opacity='0.5' white title='Apelido 1            ' />

          <Label opacity='0.5' white title='Últimos 4 dígitos   ' />

          <Label opacity='0.5' white title='Apelido 2            ' />


          <TouchableOpacity onPress={this.pass} style={{ marginTop: '10%', marginBottom: '10%' }}>
            <Label opacity='0.5' white title='Inserir novo cartão' />
          </TouchableOpacity>

          <Label opacity='1' black title='Confirme o CVV:' />
          <TextInput placeholder='CVV'
            value={this.state.cvv}
            style={[commonStyles.input, { height: '10%', textAlign: 'center' }]}
            onChangeText={cvv => this.setState({ cvv })} />

          <View style={commonStyles.backOrNext}>
            <Buttons back white title={`     Voltar     \n`} onClick={this.pass} />
            <Buttons next white title={`Efetuar\nPagamento`} onClick={this.pass} />
          </View>


        </View>

      </SafeAreaView>
    )
  }
}
