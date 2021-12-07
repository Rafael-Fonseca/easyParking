// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native"
import RadioGroup from 'react-native-radio-buttons-group'
import Buttons from '../pieces/Buttons';

// const textStyle = {color: '#fFF', fontSize: 15}

const initialState = {
  cost_min: '',
}


export default class GerTickets extends Component {

  state = {
    ...initialState
  }

  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }

  confirm = async () => {
    if (this.state.cost_min == ""){
      Alert.alert('Valor inválido!', 'O custo por minuto não pode ser vazio.')
    } else{
      await axios.post(`${server}/setting_update`, {
        min_cost: this.state.cost_min
      }).then(res => {
        this.props.navigation.navigate('AdmLogged')
        Alert.alert(res.data)
      })
    }
    
  }

  render() {
    return (
      <SafeAreaView style={[commonStyles.background, {justifyContent: 'flex-start', paddingTop: '25%'}]}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            GERENCIAR TICKETS
          </Text>

          <View style={{paddingHorizontal: '10%'}}>
          <TextInput placeholder='Valor do minuto'
            value={this.state.cost_min}
            style={[commonStyles.input, {textAlign: 'center', height: 40}]}
            onChangeText={cost_min => this.setState({ cost_min })} />
          </View>

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back}/>
            <Buttons next white title='Confirmar' onClick={this.confirm}/>
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
