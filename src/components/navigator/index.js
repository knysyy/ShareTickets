import React, { Component } from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { ThemeProvider } from "react-native-elements";
import Icon from 'react-native-vector-icons/AntDesign';

import LoginForm from '../login';
import SignupForm from '../singup';
import EditForm from '../edit';
import Home from '../home';
import AddForm from "../add";
import ProfileForm from "../profile";
import { theme, headerStyle } from './style';
import {styles} from "../home/style";

const WINDOW_WIDTH = Dimensions.get("window").width;

// AntDesign/adduser, home, user

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    if(routeName === 'Home') {
        iconName = "home";
    } else if (routeName === 'Add Friend') {
        iconName = 'adduser';
    } else if (routeName === 'Profile') {
        iconName = 'user';
    }
    return <Icon name={iconName} size={25} color={tintColor} />;
};

const Main = createAppContainer(createBottomTabNavigator(
    {
        Home: {
            screen: Home
        },
        "Add Friend": {
            screen: AddForm
        },
        Profile: {
            screen: ProfileForm
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
            headerLeft: <View />,
            headerRight: () =>
                    <Icon name="logout" size={30} color="#fff" />
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        }
    }
    )
);

const RootStack = createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        SignUp: {
            screen: SignupForm
        },
        Edit: {
            screen: EditForm
        },
        Main: {
            screen: Main
        }
    },
    {
        defaultNavigationOptions: headerStyle,
        initialRouteName: 'Login'
    });

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