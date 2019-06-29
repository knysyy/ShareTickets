import {NavigationActions, StackActions} from "react-navigation";

export const logoutReset = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Auth'})]
});

export const loggedReset = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Main'})]
});

export const editReset = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Auth',
            action: NavigationActions.navigate({
                routeName: 'Edit'
            })
        })
    ]
});