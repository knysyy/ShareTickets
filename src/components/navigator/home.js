import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from "react-navigation";

import FriendList from '../friendList';
import TicketList from '../ticketList';
import {commonHeader} from "./style";
import {switchTabBarVisible} from "../lib";

const HomeStack = createStackNavigator(
    {
        FriendList: {
            screen: FriendList
        },
        TicketList: {
            screen: TicketList,
            navigationOptions: {
                headerRight: <View/>
            }
        }
    },
    {
        initialRouteName: 'FriendList',
        defaultNavigationOptions: {
            ...commonHeader,
            headerBackTitle: null
        },
        navigationOptions: ({navigation}) => switchTabBarVisible(navigation)
    }
);

export default HomeStack;