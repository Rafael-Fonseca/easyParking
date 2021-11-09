import React from "react"
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native"
import commonStyles from '../commonStyles'
import ImgButton from "./ImgButton"

// Importações do Back end
import axios from 'axios'
import { server, showError, showSuccess } from '../../code/common';


export default props => {

  const editOffer = () => {
    props.navigation('CreateOffer', { first: true, 'offer': props.offer })
  }
  const deleteOffer = async () => {
    try {
      const res = await axios.post(`${server}/offer_delete`, {
        'target_pk_offer': props.offer.pk_offer
      })
      props.navigation('AdmLogged')
      Alert.alert(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={commonStyles.buttonText}>{props.offer.nme_company}</Text>

        {props.options &&
          <View style={styles.view_images}>

            <ImgButton path={edit} onClick={editOffer} />
            <ImgButton path={del} onClick={deleteOffer} />

          </View>
        }
      </View>

      <Image style={commonStyles.boxImage}
        source={{ uri: props.offer.img }} />

    </View>
  )
}

const edit = require('../../../assets/edit.png')
const del = require('../../../assets/delete.png')

const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgba(255, 255, 255, 0.35)`,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: '2%',
    marginTop: '5%',
    justifyContent: 'space-around',
    paddingBottom: '5%',
  },

  view_images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '45%',
  },
})