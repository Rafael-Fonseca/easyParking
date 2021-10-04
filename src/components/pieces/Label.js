import React from "react"
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native"

import commonStyles from '../commonStyles'
import ImgButton from "./ImgButton"

export default props => {

  const editCard = () => {
    Alert.alert('Recupera as informações do BD e coloca no initialState!')
    props.navigation.navigate('CreateCard')
  }
  const deleteCard = () => {
    Alert.alert('Retira as informações do BD e recarrega a página!')
    props.navigation.navigate('GerCard')
  }
  
  const stylesLabel = []
  const stylesText = []

  stylesLabel.push(styles.container)
  stylesLabel.push({ backgroundColor: `rgba(255, 255, 255, ${props.opacity})` })

  if (props.white) stylesText.push(commonStyles.buttonText)
  if (props.black) stylesText.push(commonStyles.blackButtonText)



  return (
    <View style={[stylesLabel, { flexDirection: 'row' }]}>
      <Text style={[stylesText]}>{props.title}</Text>

      {props.options &&
        <View style={styles.view_images}>

          <ImgButton path={edit} onClick={editCard} />
          <ImgButton path={del} onClick={deleteCard} />

        </View>
      }
    </View>
  )
}

const edit = require('../../../assets/edit.png')
const del = require('../../../assets/delete.png')

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: '2%',
    justifyContent: 'space-around',
    paddingBottom: '5%',
  },

  view_images:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10%',
  },
})