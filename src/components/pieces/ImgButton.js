import React from "react"
import {
  Image,
  TouchableOpacity,
} from "react-native"
import commonStyles from '../commonStyles';


export default props => {

  return (
    <TouchableOpacity onPress={() => props.onClick(props.title)}>
      <Image style={commonStyles.image}
        source={props.path} />
    </TouchableOpacity>
  )
}