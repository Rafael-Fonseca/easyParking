import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import auth from './screens/Auth'
import home from './screens/Home'
import logged from './screens/Logged'
import admLogged from './screens/AdmLogged'
import gerUsers from './screens/GerUsers'
import gerTickets from './screens/GerTickets'
import gerCards from './screens/GerCards'
import createCard from './screens/CreateCard'
import dayOffer from './screens/DayOffer'
import gerOffers from './screens/GerOffers'
import createOffer from './screens/CreateOffer'
import scanTicket from './screens/ScanTicket'
import checkCost from './screens/CheckCost'
import payment from './screens/Payment'
import createCompany from './screens/CreateCompany'
import gerCompanies from './screens/GerCompanies'


const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: auth
    },
    Home:{
        name: 'Home',
        screen: home
    },
    Logged:{
        name: 'Logged',
        screen: logged
    },
    AdmLogged:{
        name: 'AdmLogged',
        screen: admLogged
    },
    GerUsers:{
        name: 'GerUsers',
        screen: gerUsers
    },
    GerTickets:{
        name: 'GerTickets',
        screen: gerTickets
    },
    GerCards:{
        name: 'GerCards',
        screen: gerCards
    },
    CreateCard:{
        name: 'CreateCard',
        screen: createCard
    },
    DayOffer: {
        name: 'DayOffer',
        screen: dayOffer
    },
    GerOffers: {
        name: 'GerOffers',
        screen: gerOffers
    },
    CreateOffer: {
        name: 'CreateOffer',
        screen: createOffer
    },
    ScanTicket: {
        name: 'ScanTicket',
        screen: scanTicket
    },
    CheckCost: {
        name: 'CheckCost',
        screen: checkCost
    },
    Payment: {
        name: 'Payment',
        screen: payment
    },
    CreateCompany: {
        name: 'CreateCompany',
        screen: createCompany
    },
    GerCompanies: {
        name: 'GerCompanies',
        screen: gerCompanies
    },
}

const mainNavigator = createSwitchNavigator(mainRoutes,{
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)