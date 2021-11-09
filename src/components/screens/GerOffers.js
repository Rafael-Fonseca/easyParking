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

import Label from '../pieces/Label'
import LabelOffer from '../pieces/LabelOffer'
import Buttons from '../pieces/Buttons';


export default class GerOffers extends Component {

  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }
  createOffer = () => {
    this.props.navigation.navigate('CreateOffer', { 'first': true })
  }

  navigator = this.props.navigation

  render() {
    let offers = []
    for (let i = 0; i < Object.keys(this.props.navigation.state.params).length; i++) {
      if (this.navigator.getParam(i).is_active) {
        offers.push(
          <LabelOffer
            options
            navigation={this.navigator.navigate}
            offer={this.navigator.getParam(i)}
            key={i}
          />
        )
      }
    }

    return (
      <SafeAreaView style={[commonStyles.background, { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <TouchableOpacity onPress={this.createOffer}>
            <Label opacity='1' black title='Criar nova oferta' />
          </TouchableOpacity>

          {offers}

          <Buttons title={`\n Voltar`} white back onClick={this.back} />

        </View>

      </SafeAreaView>
    )
  }
}
