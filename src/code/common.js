import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios'
    ? 'https://localhost:3443' : 'http://192.168.1.12:3000'
    
const paymentServer = Platform.OS === 'ios'
    ? 'https://localhost:3500' : 'http://192.168.1.12:3500'

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um Problema!1', `Mensagem: ${err.response.data}`)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!2', `Mensagem: ${err}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess, paymentServer }