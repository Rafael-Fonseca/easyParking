// Importações do Front end
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import commonStyles from '../commonStyles';

// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';

const initialState = {
  name: '',
  cpf: '',
  mail: '',
  password: '',
  confirmPassword: '',
  stageNew: false,
}


export default class Login extends Component {

  state = {
    ...initialState
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      if (this.state.password === this.state.confirmPassword && this.state.password.length === 6) {
        
        if (/^[0-9]+$/.test(this.state.cpf) && this.state.cpf.length === 11) {
          
          if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(this.state.mail)) {
            
            if(this.state.name != ''){
              this.signup()
            }else{
              Alert.alert('Nome inválido!', 'O nome não pode estar vazio.')
            }
          } else {
            Alert.alert('e-mail inválido!', 'O e-mail deve ter um início @domínio.algo.algo')
          }
        } else {
          Alert.alert('CPF inválido!',
            'O cpf deve conter apenas números e possuir 11 dígitos.')
        }
      } else {
        Alert.alert('Senhas inválidas!',
          'Ou valores digitados nos campos senha e confirmação de senha não são iguais.\n\nOu a senha não possui 6 dígitos.')
      }

    } else {
      this.signin()
    }
  }

  signup = () => {
    axios.post(`${server}/signup`, {
      name: this.state.name,
      cpf: this.state.cpf,
      mail: this.state.mail,
      password: this.state.password
    })
      .then(() => {
        showSuccess('Usuário cadastro!')
        this.setState({ ...initialState })
      })
      .catch(e => showError(e))
  }

  signin = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        mail: this.state.mail,
        password: this.state.password
      })

      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`

      if (res.data.role === 'admin')
        this.props.navigation.navigate('AdmLogged')
      else
        this.props.navigation.navigate('Logged')
    } catch (err) {
      showError(err)
    }
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          {this.state.stageNew &&
            <TextInput placeholder='Nome'
              value={this.state.name}
              style={commonStyles.input}
              onChangeText={name => this.setState({ name })} />
          }

          {this.state.stageNew &&
            <TextInput placeholder='CPF'
              value={this.state.cpf}
              style={commonStyles.input}
              keyboardType='numeric'
              onChangeText={cpf => this.setState({ cpf })} />
          }

          <TextInput placeholder='E-mail'
            value={this.state.mail}
            style={commonStyles.input}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={mail => this.setState({ mail })} />

          <TextInput placeholder='Senha'
            value={this.state.password}
            style={commonStyles.input}
            secureTextEntry={true}
            keyboardType='numeric'
            onChangeText={password => this.setState({ password })} />

          {this.state.stageNew &&
            <TextInput placeholder='Confirme a senha'
              value={this.state.confirmPassword}
              style={commonStyles.input}
              secureTextEntry={true}
              keyboardType='numeric'
              onChangeText={confirmPassword => this.setState({ confirmPassword })} />
          }

          <TouchableOpacity
            onPress={this.signinOrSignup}
          >
            <Text
              style={[commonStyles.buttonText, commonStyles.buttonNext, { marginTop: '5%' }]}>
              {this.state.stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          {!this.state.stageNew &&
            <Image style={commonStyles.image}
              source={require('../../../assets/logotype.png')} />
          }

          {/* {!this.state.stageNew &&
            <TouchableOpacity
            // onPress={onPress}
            >
              <Text
                style={[commonStyles.buttonText, { marginTop: '10%' }]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          } */}

          <TouchableOpacity
            onPress={() => this.setState({ stageNew: !this.state.stageNew })}
          >
            <Text
              style={[commonStyles.buttonText, { marginTop: '10%' }]}>
              {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
