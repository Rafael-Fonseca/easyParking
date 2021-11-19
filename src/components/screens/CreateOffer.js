// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';

// Importações do Front end
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Buttons from '../pieces/Buttons';


export default function App({ navigation }) {
  const [tme_begin, set_tme_begin] = useState(new Date(Date.now()));
  const [tme_end, set_tme_end] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [show_begin, set_show_begin] = useState(false);
  const [cnpj, setCnpj] = useState('')
  const [image, setImage] = useState(null)

  if (navigation.state.params.first === true) {
    if (navigation.state.params.offer !== undefined) {
      set_tme_begin(new Date(navigation.state.params.offer.tme_begin))
      set_tme_end(new Date(navigation.state.params.offer.tme_end))
      setCnpj(navigation.state.params.offer.cnpj)
      setImage(navigation.state.params.offer.img)
    }
    navigation.state.params.first = false
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, a permissão para acessar seus arquivos é necessária para incluir a imagem da oferta.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || tme_end;
    setShow(false);
    set_tme_end(currentDate);
  };

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || tme_end;
    set_show_begin(false);
    set_tme_begin(currentDate);
  };

  const showDateBegin = () => {
    set_show_begin(true)
  };

  const showDateEnd = () => {
    setShow(true)
  };

  const back = () => {
    navigation.navigate('AdmLogged')
  }
  const confirm = async () => {
    if (image === null) {
      Alert.alert('É necessário incluir uma imagem!')
    }
    else { //A imagem não é nula

      try {
        //Se update sem alterar imagem, fetch image da network failed
        // tratar no cath ou alterar local deste fetch, lembrando que ele é
        // necessário, quando o usuário incluir a imagem.
        const response = await fetch(image)
        const blob = await response.blob()
        var reader = new FileReader();
        reader.onloadend = async () => {
          try {

            if (navigation.state.params.offer !== undefined) {
              const res = await axios.post(`${server}/offer_update`, {
                'cnpj': cnpj,
                'tme_end': tme_end.getTime(),
                'tme_begin': tme_begin.getTime(),
                'img': reader.result,
                'target_pk_offer': navigation.state.params.offer.pk_offer,

              })
              if (res.status === 255){
                Alert.alert('CNPJ inválido!', 'O CNPJ informado não foi localizado na base de dados.')
              }else{
                navigation.navigate('AdmLogged')
                Alert.alert(res.data)
              }

            } else {
              const res = await axios.post(`${server}/offer_create`, {
                'cnpj': cnpj,
                'tme_end': tme_end.getTime(),
                'tme_begin': tme_begin.getTime(),
                'img': reader.result,
              })
              if (res.status === 255){
                Alert.alert('CNPJ inválido!', 'O CNPJ informado não foi localizado na base de dados.')
              }else{
                navigation.navigate('AdmLogged')
                Alert.alert(res.data)
              }
              

            }
          } catch (err) {
            console.log(err)
          }
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        //TODO: Todas as outras exceções diferentes de network error deveriam
        // seguir por outro fluxo! 
        try {
          axios.post(`${server}/offer_update`, {
            'cnpj': cnpj,
            'tme_end': tme_end.getTime(),
            'tme_begin': tme_begin.getTime(),
            'img': image,
            'target_pk_offer': navigation.state.params.offer.pk_offer,
          }).then(res => {
            if (res.status === 255){
              Alert.alert(res.data)
            } else {
              navigation.navigate('AdmLogged')
              Alert.alert(res.data)
            }
          })
          

        } catch (e) {
          console.log(e)
        }

      }
    }
  }

  return (
    <SafeAreaView style={commonStyles.background}>
      <StatusBar backgroundColor='#fff' />

      <View style={commonStyles.container}>

        <Text style={commonStyles.title}>
          { navigation.state.params.offer === undefined
          ? 'Cadastre a oferta'
          : 'Altere a oferta'}
        </Text>

        <TextInput placeholder='CNPJ'
          value={cnpj}
          style={commonStyles.input}
          keyboardType='numeric'
          onChangeText={cnpj => setCnpj(cnpj)} />

        <View style={{ marginTop: '5%', marginBottom: '2%' }}>
          <View>
            <Button onPress={showDateBegin} title="INICIO DA OFERTA?" />
          </View>
          {show_begin && (
            <DateTimePicker
              testID="datePickerBegin"
              value={tme_begin}
              mode='date'
              onChange={onChangeBegin}
            />
          )}
        </View>

        <View style={{ marginTop: '5%', marginBottom: '2%' }}>
          <View>
            <Button onPress={showDateEnd} title="ATÉ QUANDO VALE A OFERTA?" />
          </View>
          {show && (
            <DateTimePicker
              testID="datePickerEnd"
              value={tme_end}
              mode='date'
              onChange={onChangeEnd}
            />
          )}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '3%' }}>
          <Button title="Selecione uma imagem" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ marginTop: '5%', width: 280, height: 140 }} />}
        </View>

        <View style={[commonStyles.backOrNext, { marginTop: '10%' }]}>
          <Buttons back white title='Cancelar' onClick={back} />
          <Buttons next white title='Confirmar' onClick={confirm} />
        </View>

      </View>
    </SafeAreaView>
  );
}
