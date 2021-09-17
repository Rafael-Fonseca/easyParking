//TODO: Arquivo para guardar os stylos comuns a várias telas da aplicação.
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#673DDE',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title:{
        //TODO: fontFamily: Alguma fonte massa,
        color: '#fff',
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        //TODO: fontFamily: Alguma fonte massa,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    container: {
        // padding: 20,
        width: '80%',
    },
    panelContainer: {
        backgroundColor: 'rgba(1, 1, 1, 0.35)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: '3%',
        paddingLeft: '5%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: '10%',
    },
    buttonNext: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonBack: {
        backgroundColor: '#800',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        // TODO: fontFamily: Alguma fonte maneira,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    image:{
        marginTop: '10%',
        marginLeft: '4.5%',
    }
});

export default styles;