//Todo: Componente que realiza a navegação entre as telas
// import React from "react"; // DESCOMENTAR CASO USE JFX
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import auth from './screens/Auth'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: auth
    },
}

const mainNavigator = createSwitchNavigator(mainRoutes,{
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)