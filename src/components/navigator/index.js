import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ThemeProvider } from "react-native-elements";
import {theme, commonHeader} from './style';

import Auth from './auth';
import Main from './main';
import {getActiveRouteState} from "../lib";

const WINDOW_WIDTH = Dimensions.get("window").width;
const stackRouteNames = ['Login', 'SignUp', 'Edit', 'FriendList', 'TicketList', 'Add Tickets', 'QRCode', 'QRCodeReader'];

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
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = getActiveRouteState(navigation.state);
            const isStack = stackRouteNames.indexOf(routeName) >= 0;
            const header = isStack ? { header : null} : {};
            return Object.assign(header, commonHeader);
        }
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