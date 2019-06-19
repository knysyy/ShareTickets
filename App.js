import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from "react-native-elements";
import Navigator from './src/components/navigator';
import configureStore from './src/store';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator/>
            </Provider>
        );
    }
}
