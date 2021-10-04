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


export default class AdmLogged extends Component {

  gerUsers = () => {
    this.props.navigation.navigate('GerUsers')
  }
  gerOffers = () => {
    this.props.navigation.navigate('GerOffers')
  }
  gerTickets = () => {
    this.props.navigation.navigate('GerTickets')
  }
  gerCompanies = () => {
    this.props.navigation.navigate('GerCompanies')
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
            <Buttons title={`Gerenciar\n usuários`} top onClick={this.gerUsers} />
            <Buttons title={`Gerenciar\n  ofertas`} top onClick={this.gerOffers} />
          </View>

          <View style={commonStyles.bottomPanelContainer}>
            <Buttons title={`    Gerenciar Tickets`}
              bot onClick={this.gerTickets} />
          </View>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <View>
            <Buttons title={`Gerenciar\nEmpresas`} out onClick={this.gerCompanies} />
          </View>
          <View style={{ marginLeft: '20%' }}>
            <Buttons title={`\n  SAIR`} out onClick={this.logout} />
          </View>
        </View>


      </SafeAreaView>
    )
  }
}
