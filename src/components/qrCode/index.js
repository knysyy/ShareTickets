import React, {Component} from 'react';
import {Text, View} from 'react-native';
import QRCode from 'react-native-qrcode';
import uuid from 'react-native-uuid';
import {styles} from './style';
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {getCameraPermission} from "../lib";
import {commonStyle, primaryButtonStyle} from "../style/globalStyles";

class QRCodeForm extends Component {
    state = {
        value: uuid.v4()
    };

    async onPressButton() {
        const granted = await getCameraPermission();
        if (granted) {
            this.props.navigation.navigate('QRCodeReader');
        }
    }

    // TODO ユーザー登録の際にuuidを保存しそこからQRCodeを表示する。
    // TODO カメラを起動して友達登録画面を作成する。
    render() {
        return (
            <View style={commonStyle.container}>
                <View style={styles.qrCodeView}>
                    <QRCode
                        value={this.state.value}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>
                <View style={styles.textView}>
                    <Text>
                        友達がこのQRコードをこのアプリのQRコードでスキャンすると、あなたを友達に追加できます。
                    </Text>
                </View>
                <Button
                    title="QRコードリーダー"
                    {...primaryButtonStyle}
                    onPress={() => this.onPressButton()}
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
)(QRCodeForm);