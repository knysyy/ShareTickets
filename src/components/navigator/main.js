import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Home from "./home";
import AddFriend from "./addFriend";
import Profile from "../profile";
import { getTabBarIcon } from "../lib";

const Main = createBottomTabNavigator(
    {
        Home: {
            screen: Home
        },
        "Add Friend": {
            screen: AddFriend
        },
        Profile: {
            screen: Profile
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        },
        initialRouteName: 'Home'
    }
);

export default Main;