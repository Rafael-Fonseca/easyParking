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
  Text,
} from "react-native"

import Buttons from '../pieces/Buttons';


export default class CheckCost extends Component {
  pass = () => {
    Alert.alert('Apertou!')
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <Text style={commonStyles.title}>
          Tempo Estacionado:
        </Text>

        <Text style={commonStyles.title}>
          Tempo em HH:MM:SS
        </Text>

        <Text style={commonStyles.title}>
          Total a pagar:
        </Text>

        <Text style={commonStyles.title}>
        Valor calculado à partir do bd
        </Text>

        <View style={commonStyles.panelContainer}>

          <View style={commonStyles.topPanelContainer}>
            <Buttons title={`Menu`} top onClick={this.pass} />
            <Buttons title={` Outro \n  Ticket`} top onClick={this.pass} />
          </View>

          <View style={commonStyles.bottomPanelContainer}>
            <Buttons title={`Efetuar pagamento`}
              bot onClick={this.pass} />
          </View>
        </View>


      </SafeAreaView>
    )
  }
}
