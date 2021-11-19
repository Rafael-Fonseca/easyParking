// Importações do Back end
import axios from 'axios'
import { server, showError, paymentServer } from '../../code/common';


// Importações do Front end
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import {
  SafeAreaView,
  View,
  Alert,
  Text,
} from "react-native"

import Buttons from '../pieces/Buttons';


export default class CheckCost extends Component {
  menu = () => {
    this.props.navigation.navigate('Logged')
  }

  renew = () => {
    this.props.navigation.state.params.times = undefined

    this.props.navigation.navigate('CheckCost', {
      'ticket': this.props.navigation.state.params.ticket,

    })
  }

  selectCard = async () => {
    try {
      const res = await axios.post(`${server}/cards_read`)
      let objListCards = res.data

      let objCards = {}
      for (var i = 0; i < objListCards.length; i++)
        objCards[i] = objListCards[i]

      this.props.navigation.navigate('SelectCard', {
        objCards,
        'cost': this.props.navigation.state.params.cost.toFixed(2),
        'pk_bar_code': this.props.navigation.state.params.ticket.split(':')[1]
      })
    } catch (err) {
      showError(err)
    }
  }

  getTimes = async () => {
    try {
      const res = await axios.post(`${server}/ticket_read`,
        {
          'target_pk_bar_code': this.props.navigation.state.params.ticket.split(':')[1],
          'what': ['tme_start', 'tme_end'],
          'mode': 'first,'
        })

      // console.log('RETORNO', res.data[0].tme_end)  // null
      let timestampTicket = 0

      if (res.data[0].tme_end === null) {
        timestampTicket = new Date(res.data[0].tme_start).getTime()
        let actualTime = new Date().getTime()

        var timeDiff = Math.abs(actualTime - timestampTicket)
        var diffHours = timeDiff / (1000 * 60 * 60)
        var diffMins = (diffHours - Math.floor(diffHours)) * 60
        var diffSecs = (diffMins - Math.floor(diffMins)) * 60
        var min_cost = await (await axios.get(`${server}/get_cost`)).data[0].min_cost
        var cost = Math.floor(timeDiff / (1000 * 60)) * min_cost

        this.props.navigation.navigate('CheckCost', {
          'ticket': this.props.navigation.state.params.ticket,
          'times': {
            'hours': Math.floor(diffHours),
            'mins': Math.floor(diffMins),
            'secs': Math.floor(diffSecs),
          },
          'cost': cost,
          'tme_end': ''
        })
      } else { //tme_end preenchido

        timestampTicket = new Date(res.data[0].tme_start).getTime()
        let actualTime = new Date(res.data[0].tme_end).getTime()

        var timeDiff = Math.abs(actualTime - timestampTicket)
        var diffHours = timeDiff / (1000 * 60 * 60)
        var diffMins = (diffHours - Math.floor(diffHours)) * 60
        var diffSecs = (diffMins - Math.floor(diffMins)) * 60
        var cost = 'Este Ticket está pago.'

        this.props.navigation.navigate('CheckCost', {
          'ticket': this.props.navigation.state.params.ticket,
          'times': {
            'hours': Math.floor(diffHours),
            'mins': Math.floor(diffMins),
            'secs': Math.floor(diffSecs),
          },
          'cost': cost,
          'tme_end': 'outro'
        })
      }




    } catch (err) {
      showError(err)
    }
  }

  render() {
    if (this.props.navigation.state.params.times !== undefined) {
    }
    else if (this.props.navigation.state.params.ticket.split(':')[0] === 'easyParking') {
      this.getTimes()

    } else {
      Alert.alert(
        "Código de Barras errado!",
        "Você está lendo um código de barras que não pertence a este estacionamento",
        [
          {
            text: "Voltar",
            onPress: () => this.props.navigation.navigate('Logged'),
          },
        ]
      )
    }

    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <Text style={commonStyles.title}>
          Tempo Estacionado:
        </Text>

        <Text style={commonStyles.title}>
          {this.props.navigation.state.params.times ?
            `${this.props.navigation.state.params.times.hours}h : ${this.props.navigation.state.params.times.mins}min : ${this.props.navigation.state.params.times.secs}seg`
            : 'HH:MM:SS'}
        </Text>

        <Text style={commonStyles.title}>
          Total a pagar:
        </Text>

        <Text style={commonStyles.title}>
          {this.props.navigation.state.params.cost &&
            this.props.navigation.state.params.tme_end === '' ?
            `R$ ${this.props.navigation.state.params.cost.toFixed(2)}`
            : this.props.navigation.state.params.cost}
        </Text>

        <View style={commonStyles.panelContainer}>

          {this.props.navigation.state.params.tme_end === '' &&
            <View style={commonStyles.topPanelContainer}>
              <Buttons title={`Menu`} top onClick={this.menu} />
              <Buttons title={` Atualizar \n  Valor`} top onClick={this.renew} />
            </View>
          }


          <View style={commonStyles.bottomPanelContainer}>
            {this.props.navigation.state.params.tme_end === ''
              ? <Buttons title={`Efetuar pagamento`}
              bot onClick={this.selectCard} />
              : <Buttons title={`Menu`} bot onClick={this.menu} />
              
            }
          </View>

        </View>


      </SafeAreaView>
    )
  }
}
