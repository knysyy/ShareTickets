import React, { Component } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode';
import uuid from 'react-native-uuid';
import { primaryButtonStyle, styles } from './style';
import { Button } from "react-native-elements";

export default class AddForm extends Component {
    state = {
        value: uuid.v4()
    };

    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.state.value}
                    size={200}
                    bgColor='black'
                    fgColor='white'
                />
                <Button
                    {...primaryButtonStyle}
                    title='QRコードを読み込む'
                    type='clear'
                />
            </View>
        )
    }
}