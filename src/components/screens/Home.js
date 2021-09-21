import React, { Component } from "react"
import { SafeAreaView, Text } from "react-native"
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';


export default class Login extends Component {

  render() {
    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />
        <Text>
          Estamos na Home
        </Text>
      </SafeAreaView>
    )
  }
}