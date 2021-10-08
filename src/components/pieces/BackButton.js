import React from "react"
import {
  Text,
  TouchableOpacity,
} from "react-native"
import commonStyles from '../commonStyles'

export default props => {

  const comeback = () => {
    props.navigator.navigate(props.destiny)
  }

  return (
      <TouchableOpacity onPress={() => comeback()}>
        <Text style={[commonStyles.buttonBack, commonStyles.buttonText]}>
          Voltar
        </Text>
      </TouchableOpacity>
  )
}
