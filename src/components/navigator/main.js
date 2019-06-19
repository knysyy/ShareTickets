import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/AntDesign";
import Home from "../home";
import AddForm from "../add";
import ProfileForm from "../profile";
import { styles } from './style';

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

const Main = createBottomTabNavigator(
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
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        },
        initialRouteName: 'Home'
    }
);

export default createAppContainer(Main);