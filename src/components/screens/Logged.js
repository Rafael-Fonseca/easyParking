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
} from "react-native"

import Buttons from '../pieces/Buttons';


export default class Logged extends Component {

  gerCards = () => {
    this.props.navigation.navigate('GerCards')
  }
  dayOffer = () => {
    this.props.navigation.navigate('DayOffer')
  }
  scanTicket = () => {
    this.props.navigation.navigate('ScanTicket')
  }
  createTicket = () => {
    Alert.alert('Gerar ticket e recarregar a página')
    this.props.navigation.navigate('Logged')
  }
  logout = () => {
    Alert.alert('Retirar autorização do cabeçalho')
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.panelContainer}>

          <View style={commonStyles.topPanelContainer}>
            <Buttons title={`Gerenciar\n cartões`} top onClick={this.gerCards} />
            <Buttons title={` Ofertas \n  do dia`} top onClick={this.dayOffer} />
          </View>

          <View style={commonStyles.bottomPanelContainer}>
            <Buttons title={`Acompanhar ou pagar\n     estacionamento`}
              bot onClick={this.scanTicket} />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
          <Buttons title={`Gerar\nTicket!`} out onClick={this.createTicket} />
          </View>
          <View style={{marginLeft: '20%'}}>
          <Buttons title={`\nSair`} out onClick={this.logout}/>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
