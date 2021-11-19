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

  first = true

  onPress = credit => this.setState({ credit });

  back = () => {
    this.props.navigation.navigate('Logged')
  }
  confirm = () => {

    try {
      this.state.credit.find(e => e.selected == true).value
      if (/^[0-9]+$/.test(this.state.num_cd) && this.state.num_cd.length === 16) {

        if (this.state.validity != '') {

          if (/^[0-9]+$/.test(this.state.cvv) && this.state.cvv.length === 3) {

            if (this.state.nme_cd_holder != '') {
              let card_data = {
                num_cd: this.state.num_cd,
                validity: this.state.validity,
                credit: this.state.credit.find(e => e.selected == true).value,
                nme_cd_holder: this.state.nme_cd_holder,
                nme_cd: this.state.nme_cd
              }

              if (this.props.navigation.state.params){
                card_data.pk_card = this.props.navigation.state.params.pk_card
                axios.post(`${server}/cards_update`, card_data)
                .then(() => {
                  showSuccess('Cartão alterado com sucesso!')
                  this.props.navigation.navigate('Logged')
                })
                .catch(e => showError(e))
              }else{
                axios.post(`${server}/cards_create`, card_data)
                .then(() => {
                  showSuccess('Cartão cadastrado com sucesso!')
                  this.props.navigation.navigate('Logged')
                })
                .catch(e => showError(e))
              }

            } else {
              Alert.alert('Nome do portador inválido!', 'Este campo não pode ser vazio.')
            }
          } else {
            Alert.alert('CVV inválido!', 'O CVV deve ser preenchido com 3 números.')
          }
        } else {
          Alert.alert('Validade inválida!', 'O campo validade não pode ser vazio.')
        }

      } else {
        Alert.alert('Número de cartão inválido!', 'Preencha com 16 números.')
      }

    } catch (err) {
      console.log(err)
      Alert.alert('Função inválida!', 'Selecione Débito ou Crédito.')

    }


  }

  render() {
    let selected_credit = this.state.credit.find(e => e.selected == true);
    selected_credit = selected_credit ? selected_credit.value : null;

    if (this.props.navigation.state.params !== undefined &&
      this.first === true) {
      this.state.num_cd = this.props.navigation.state.params.num_cd
      this.state.validity = this.props.navigation.state.params.validity
      this.state.cvv = ''
      this.state.nme_cd_holder = this.props.navigation.state.params.nme_cd_holder
      this.state.nme_cd = this.props.navigation.state.params.nme_cd
      this.first = false
    }


    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>
            {this.props.navigation.state.params ?
              'Alterar cartão' : 'Cadastrar cartão'
            }
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
            keyboardType='numeric'
            onChangeText={num_cd => this.setState({ num_cd })} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput placeholder='Validade'
              value={this.state.validity}
              style={[commonStyles.input, { height: '100%', width: '45%' }]}
              onChangeText={validity => this.setState({ validity })} />

            <TextInput placeholder='CVV'
              value={this.state.cvv}
              style={[commonStyles.input, { height: '100%', width: '45%' }]}
              keyboardType='numeric'
              onChangeText={cvv => this.setState({ cvv })} />
          </View>

          <TextInput placeholder='Nome do portador, como consta no cartão'
            value={this.state.nme_cd_holder}
            style={[commonStyles.input, { marginTop: '6%' }]}
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
