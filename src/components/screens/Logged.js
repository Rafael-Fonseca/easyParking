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

  gerCards = async () => {
    try {
      const res = await axios.post(`${server}/cards_read`)
      let objListCards = res.data

      let objCards = {}
      for (var i = 0; i < objListCards.length; i++)
        objCards[i] = objListCards[i]

      this.props.navigation.navigate('GerCards', objCards)

    } catch (err) {
      showError(err)
    }
  }


  dayOffer = async () => {
    try {
      const res = await axios.get(`${server}/offer_read`)
      let objListOffers = res.data

      let objOffers = {}
      for (var i = 0; i < objListOffers.length; i++)
        objOffers[i] = objListOffers[i]

      this.props.navigation.navigate('DayOffer', objOffers)

    } catch (err) {
      showError(err)
    }
  }

  scanTicket = () => {
    this.props.navigation.navigate('ScanTicket')
  }

  createTicket = async () => {
    try {
      await axios.get(`${server}/ticket_create`)
      Alert.alert('Ticket gerado e página recarregada')
      this.props.navigation.navigate('Logged')
    } catch (err) {
      showError(err)
    }

  }

  logout = () => {
    delete axios.defaults.headers.common["Authorization"]
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

        <View style={{ flexDirection: 'row' }}>
          <View>
            <Buttons title={`Gerar\nTicket!`} out onClick={this.createTicket} />
          </View>
          <View style={{ marginLeft: '20%' }}>
            <Buttons title={`\nSair`} out onClick={this.logout} />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
