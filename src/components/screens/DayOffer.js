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
  TouchableOpacity,
} from "react-native"

import LabelOffer from '../pieces/LabelOffer'
import Buttons from '../pieces/Buttons';


export default class DayOffer extends Component {

  back = () => {
    this.props.navigation.navigate('Logged')
  }

  render() {
    return (
      <SafeAreaView style={[commonStyles.background, { justifyContent: 'flex-start', paddingTop: '25%' }]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>
          <Text style={commonStyles.buttonText}>
            {`APROVEITE AS\nOFERTAS DE HOJE!!!`}
          </Text>

          <LabelOffer nme_company='Empresa 1'/>
          <LabelOffer nme_company='Empresa 2'/>

        <Buttons title={`\n Voltar`} white back onClick={this.back} />



        </View>

      </SafeAreaView>
    )
  }
}