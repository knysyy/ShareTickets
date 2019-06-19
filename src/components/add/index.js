import React, { Component } from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode';
import uuid from 'react-native-uuid';
import { styles, secondaryButtonStyle } from './style';
import { Button } from "react-native-elements";
import {connect} from "react-redux";

class AddForm extends Component {
    state = {
        value: uuid.v4()
    };

    // TODO ユーザー登録の際にuuidを保存しそこからQRCodeを表示する。
    // TODO カメラを起動して友達登録画面を作成する。
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
                    title="QEコードを読み込む"
                    type="clear"
                    {...secondaryButtonStyle}
                />
            </View>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddForm);