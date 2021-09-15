import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
    
  render() {
      return (
        <View style={styles.container}>
          <Text>Aqui é o App.js</Text>
          <StatusBar style="auto" />
        </View>
      )
  }
}



// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Alteração no index ok!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
