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
import Buttons from '../pieces/Buttons';

const initialState = {
  cnpj: '',
  nme_company: '',
}


export default class CreateCompany extends Component {

  state = {
    cnpj: this.props.navigation.state.params.cnpj,
    nme_company: this.props.navigation.state.params.nme_company
  }

  back = () => {
    this.props.navigation.navigate('AdmLogged')
  }

  del = async () => {
    await axios.post(`${server}/company_delete`, {
      target_cnpj: this.props.navigation.state.params.cnpj,
    }).then(res => {
      this.props.navigation.navigate('AdmLogged')
      Alert.alert(res.data)
    })
  }

  confirm = async () => {
    await axios.post(`${server}/company_update`, {
      cnpj: this.state.cnpj,
      nme_company: this.state.nme_company,
      target_cnpj: this.props.navigation.state.params.cnpj,
    }).then(res => {
      this.props.navigation.navigate('AdmLogged')
      Alert.alert(res.data)
    })
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            Alterar Empresa
          </Text>

          <TextInput placeholder='Insira o cnpj: '
            value={this.state.cnpj}
            style={commonStyles.input}
            keyboardType='numeric'
            onChangeText={cnpj => this.setState({ cnpj })} />

          <TextInput placeholder='Insira o nome da empresa: '
            value={this.state.nme_company}
            style={[commonStyles.input, { marginTop: '6%' }]}
            onChangeText={nme_company => this.setState({ nme_company })} />

          <View style={{marginTop:'10%'}}>
            <Buttons back white title='Deletar empresa' onClick={this.del} />
          </View>

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Cancelar' onClick={this.back} />
            <Buttons next white title='Confirmar' onClick={this.confirm} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}
