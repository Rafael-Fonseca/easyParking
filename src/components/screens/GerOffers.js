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


const initialState = {
  cost_min: '',
}


export default class GerOffers extends Component {

  state = {
    ...initialState
  }


  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }
  createOffer = () => {
    this.props.navigation.navigate('CreateOffer')
  }

  navigator = this.props.navigation

  render() {
    return (
      <SafeAreaView style={[commonStyles.background, { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

        <TouchableOpacity onPress={this.createOffer}>
          <Label opacity='1' black title='Criar nova oferta' />
        </TouchableOpacity>

        <LabelOffer nme_company='Empresa 1' options navigation={this.navigator} />
        <LabelOffer nme_company='Empresa 2' options/>

        <Buttons title={`\n Voltar`} white back onClick={this.back} />

        </View>

      </SafeAreaView>
    )
  }
}
