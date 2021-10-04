import React from "react"
import {
  Text,
  TouchableOpacity,
} from "react-native"
import commonStyles from '../commonStyles';


export default props => {
  const stylesButton = []
  if (props.top) stylesButton.push(commonStyles.topButtonPanel)
  if (props.bot) stylesButton.push(commonStyles.botButtonPanel)
  if (props.out) stylesButton.push(commonStyles.outsideButton)
  if (props.back) stylesButton.push(commonStyles.buttonBack)
  if (props.next) stylesButton.push(commonStyles.buttonNext)
  if (props.white) stylesButton.push(commonStyles.buttonText)
  

  return (
      <TouchableOpacity onPress={() => props.onClick(props.title)}>
        <Text style={stylesButton}>{props.title}</Text>
      </TouchableOpacity>
  )
}