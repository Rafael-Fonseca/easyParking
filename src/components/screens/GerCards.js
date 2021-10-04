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
} from "react-native"

import Label from '../pieces/Label';
import Buttons from '../pieces/Buttons';


export default class GerCards extends Component {

  createCard = () => {
    this.props.navigation.navigate('CreateCard')
  }
  back = () => {
    this.props.navigation.navigate('Logged')
  }
  
  navigator = this.props.navigation

  render() {
    return (
      <SafeAreaView style={[commonStyles.background, { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Label opacity='1' black title='Selecione o cartão:' />

          <Label opacity='0.5' white title='Apelido 1            ' options navigation={this.navigator}/>

          <Label opacity='0.5' white title='Últimos 4 dígitos   ' options />

          <TouchableOpacity onPress={this.createCard}>
            <Label opacity='0.5' white title='Inserir novo cartão' />
          </TouchableOpacity>

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Voltar' onClick={this.back} />
          </View>


        </View>

      </SafeAreaView>
    )
  }
}
