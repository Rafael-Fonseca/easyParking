// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component } from 'react';
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

const initialState = {
  credit: [{
    id: '1',
    label: 'Débito',
    value: 'false',
    labelStyle: commonStyles.minorText,

  }, {
    id: '2',
    label: 'Crédito',
    value: 'true',
    labelStyle: commonStyles.minorText,

  },
  ],
  num_cd: '',
  validity: '',
  cvv: '',
  nme_cd_holder: '',
  nme_cd: '',

}


export default class CreateCard extends Component {

  state = {
    ...initialState
  }

  onPress = credit => this.setState({ credit });

  back = () => {
    this.props.navigation.navigate('Logged')
  }
  confirm = () => {
    Alert.alert('Cadastre o cartão no BD')
    this.props.navigation.navigate('Logged')
  }

  render() {
    let selected_credit = this.state.credit.find(e => e.selected == true);
    selected_credit = selected_credit ? selected_credit.value : null;
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            Cadastrar cartão
          </Text>

          <View>
            <RadioGroup
              radioButtons={this.state.credit}
              onPress={this.onPress}
              containerStyle={commonStyles.radiusContainer}
            />
          </View>

          <TextInput placeholder='Número do cartão'
            value={this.state.num_cd}
            style={commonStyles.input}
            onChangeText={num_cd => this.setState({ num_cd })} />

          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <TextInput placeholder='Validade'
              value={this.state.validity}
              style={[commonStyles.input, {height: '100%', width:'45%'}]}
              onChangeText={validity => this.setState({ validity })} />

            <TextInput placeholder='CVV'
              value={this.state.cvv}
              style={[commonStyles.input, {height: '100%', width:'45%'}]}
              onChangeText={cvv => this.setState({ cvv })} />
          </View>

          <TextInput placeholder='Nome do portador, como consta no cartão'
            value={this.state.nme_cd_holder}
            style={[commonStyles.input, {marginTop: '6%'}]}
            onChangeText={nme_cd_holder => this.setState({ nme_cd_holder })} />
          
          <TextInput placeholder='Apelido do cartão: (opcional)'
            value={this.state.nme_cd}
            style={commonStyles.input}
            onChangeText={nme_cd => this.setState({ nme_cd })} />
          

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back} />
            <Buttons next white title='Confirmar' onClick={this.confirm} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
