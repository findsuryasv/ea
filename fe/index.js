/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import Store from './src/Store';
import React from 'react';

const Index = () => {
    return (
        <Provider store={Store}><App /></Provider>
    )
}

AppRegistry.registerComponent(appName, () => Index);
