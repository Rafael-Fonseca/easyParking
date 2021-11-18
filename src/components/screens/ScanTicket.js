import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import commonStyles from '../commonStyles';
import BackButton from '../pieces/BackButton';


export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log(`data em Scan: ${data}\n\ntype of: ${typeof data}\n\n`)
    if(type === 1){
      setScanned(true);
      navigation.navigate('CheckCost', {'ticket':data})
    }else{
      setScanned(false);
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.container}>
      <BarCodeScanner style={styles.container}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      <View style={[commonStyles.backOrNext, {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        justifyContent: 'flex-end'
      }]}>
        <BackButton navigator={navigation} destiny='Logged' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
