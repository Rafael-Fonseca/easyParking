// Importações do Back end
import axios from 'axios'
import { paymentServer } from '../../code/common';

import React, { Component } from "react"
import {
  SafeAreaView,
  Text,
  View,
} from "react-native"
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import Buttons from '../pieces/Buttons';
import Label from '../pieces/Label';


export default class Initial extends Component {
  back = () => {
    this.props.navigation.navigate('Logged')
  }

  render() {

    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        {this.props.navigation.state.params.paid ?

          <Label opacity='1' black title={`Pagamento no valor: ${this.props.navigation.state.params.cost}\n
          Realizado com sucesso!\t\t\t\t\t\t`} />

          :
          <Label opacity='1' black title='O pagamento não pode ser executado, algum erro aconteceu!' />
        }

        <View style={commonStyles.backOrNext}>
          <Buttons back white title='Voltar' onClick={this.back} />
        </View>


      </SafeAreaView>
    )
  }
}