import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginForm from '../login';
import SignupForm from '../singup';
import EditForm from '../edit';
import {headerStyle} from "./style";

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        SignUp: {
            screen: SignupForm
        },
        Edit: {
            screen: EditForm
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);

export default createAppContainer(AuthStack);