import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

export const getActiveRouteState = function(route) {
    if (
        !route.routes ||
        route.routes.length === 0 ||
        route.index >= route.routes.length
    ) {
        return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
};

export const getTabBarIcon = (navigation, focused, tintColor) => {
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

export const switchTabBarVisible = (navigation) => {
    let tabBarVisible = true;
    if(navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
};