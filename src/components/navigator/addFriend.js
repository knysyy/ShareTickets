import React from 'react';
import {createStackNavigator} from "react-navigation";

import QRCode from '../qrCode';
import QRCodeReader from '../qrCodeReader';
import {commonHeader} from "./style";
import {switchTabBarVisible} from "../lib";
import {View} from "react-native";

// TODO 追加の完了画面をどこに配置するか考える。
const AddFriend = createStackNavigator(
    {
        QRCode: {
            screen: QRCode
        },
        QRCodeReader: {
            screen: QRCodeReader,
            navigationOptions: {
                headerRight: <View />
            }
        }
    },
    {
        initialRouteName: 'QRCode',
        defaultNavigationOptions: {
            ...commonHeader,
            headerBackTitle: null
        },
        navigationOptions: ({navigation}) => switchTabBarVisible(navigation)
    }
);

export default AddFriend;