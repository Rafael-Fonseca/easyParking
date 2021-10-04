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

export default props => {

  const editOffer = () => {
    Alert.alert('Recupera as informações do BD e coloca no initialState!')
    props.navigation.navigate('CreateOffer')
  }
  const deleteOffer = () => {
    Alert.alert('Retira as informações do BD e recarrega a página!')
    props.navigation.navigate('GerOffer')
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <Text style={commonStyles.buttonText}>{props.nme_company}</Text>

      {props.options &&
        <View style={styles.view_images}>

          <ImgButton path={edit} onClick={editOffer} />
          <ImgButton path={del} onClick={deleteOffer} />

        </View>
      }
      </View>

      {props.path ?
        <Image style={commonStyles.image}
          source={props.path} />
        :
        <Image style={commonStyles.image}
          source={require('../../../assets/logotype.png')} />
      }

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

  view_images:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '45%',
  },
})