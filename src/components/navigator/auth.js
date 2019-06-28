import React from 'react';
import {createStackNavigator} from "react-navigation";

import LoginForm from '../login';
import SignupForm from '../singup';
import EditForm from '../registerName';
import {commonHeader} from "./style";
import {View} from "react-native";

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        SignUp: {
            screen: SignupForm,
            navigationOptions: {
                headerRight: <View />
            }
        },
        Edit: {
            screen: EditForm
        }
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            ...commonHeader,
            headerBackTitle: null
        }
    }
);

export default AuthStack;