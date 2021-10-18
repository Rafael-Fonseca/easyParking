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
  TouchableOpacity,
} from "react-native"

import Label from '../pieces/Label';
import Buttons from '../pieces/Buttons';


export default class GerCards extends Component {

  navigator = this.props.navigation
  back = () => {
    this.props.navigation.navigate('Logged')
  }


  render() {

    let cards = []
    for (let i = 0; i < Object.keys(this.props.navigation.state.params.objCards).length; i++) {
      cards.push(
        <Label
          opacity='0.5'
          white title={this.navigator.getParam('objCards')[i].nme_cd}
          navigation={this.navigator}
          card = {this.navigator.getParam('objCards')[i]}
          key = {i}
          payment
          cost = {this.navigator.getParam('cost')}
          pk_bar_code = {this.navigator.getParam('pk_bar_code')}
        />
      )
    }

    return (
      <SafeAreaView style={[commonStyles.background,
      { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Label opacity='1' black title='Selecione o cartão:' />

          {cards}

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Voltar' onClick={this.back} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
