// Este é o index do frontend
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import Navigator from './components/Navigator';

export default class App extends Component {

    render() {
        return (
            <Navigator/>
        )
    }
}
