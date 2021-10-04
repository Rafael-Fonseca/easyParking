// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


// Importações do Front end
import React, { Component, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native"
import Buttons from '../pieces/Buttons';
import { Camera } from 'expo-camera';

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

  }],

}



export default class ScanTicket extends Component {
  

  state = {
    ...initialState
  }

  // onPress = credit => this.setState({ credit });

  back = () => {
    this.props.navigation.navigate('Logged')
  }

  render() {

    return (
      <SafeAreaView style={commonStyles.background}>
        <StatusBar backgroundColor='#fff' />

        <View style={commonStyles.container}>

          <Text style={commonStyles.title}>
            Leia o Ticket do estacionamento:
          </Text>

          <Text style={commonStyles.title}>Não estou conseguindo</Text>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
            
            </Camera>
          </View>
          <Text style={commonStyles.title}>abrir a câmera ainda</Text>

          <View style={commonStyles.backOrNext}>
            <Buttons back white title='Voltar' onClick={this.back} />
          </View>

        </View>

      </SafeAreaView>
    )
  }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function App() {
  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
//   return (
//     <View style={styles.container}>
      // <Camera style={styles.camera} type={type}>
      //   <View style={styles.buttonContainer}>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => {
      //         setType(
      //           type === Camera.Constants.Type.back
      //             ? Camera.Constants.Type.front
      //             : Camera.Constants.Type.back
      //         );
      //       }}>
      //       <Text style={styles.text}> Flip </Text>
      //     </TouchableOpacity>
      //   </View>
      // </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({ ... }); 