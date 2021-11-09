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

    title: {
        //TODO: fontFamily: Alguma fonte massa,
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },

    minorText:{
        color: '#fff',
        fontSize: 20,
    },

    container: {
        // padding: 20,
        width: '80%',
    },

    panelContainer: {
        flex: 0.4,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        paddingTop: 25,
        width: '90%',
        borderRadius: 20,
        justifyContent: 'space-between',
    },

    topPanelContainer: {
        flex: 0.40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    topButtonPanel: {
        flex: 1,
        backgroundColor: '#FFE790',
        width: 100,
        borderRadius: 30,
        paddingLeft: '6%',
        paddingTop: '4%',
    },
    
    bottomPanelContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        marginHorizontal: 20,
        marginBottom: 10,
    },

    botButtonPanel: {
        backgroundColor: '#FFE790',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingLeft: '28%',
    },

    outsideButton:{
        backgroundColor: '#FFE790',
        width: 100,
        height: 100,
        borderRadius: 30,
        paddingLeft: '8%',
        paddingTop: '8%',
        marginTop: '10%',
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
        textAlignVertical: 'center',
    },

    blackButtonText: {
        // TODO: fontFamily: Alguma fonte maneira,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center' 
    },

    image: {
        marginTop: '10%',
        marginLeft: '4.5%',
    },

    boxImage: {
        width: 300,
        height: 100,
    },

    radiusContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        borderRadius: 20,
        alignItems: 'flex-start',
        paddingLeft: '22.5%'
    },

    backOrNext: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '20%'
    }
});

export default styles;