import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ThemeProvider } from "react-native-elements";
import { theme, headerStyle } from './style';

import Auth from './auth';
import Main from './main';

const WINDOW_WIDTH = Dimensions.get("window").width;

const RootStack = createStackNavigator(
    {
        Auth: {
            screen: Auth
        },
        Main: {
            screen: Main
        }
    },
    {
        defaultNavigationOptions: headerStyle
    }
);
const Route = createAppContainer(RootStack);

export default class Navigator extends Component {
    render() {
        return (
            <ThemeProvider theme={theme(WINDOW_WIDTH)}>
                <Route />
            </ThemeProvider>
        )
    }
};