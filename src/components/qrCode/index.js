import React, {Component} from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import uuid from 'react-native-uuid';
import {styles, footerFixedButton} from './style';
import {Button} from "react-native-elements";
import {connect} from "react-redux";

class QRCodeForm extends Component {
    state = {
        value: uuid.v4()
    };

    // TODO ユーザー登録の際にuuidを保存しそこからQRCodeを表示する。
    // TODO カメラを起動して友達登録画面を作成する。
    render() {
        return (
            <View style={styles.container}>
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
                    {...footerFixedButton}
                    onPress={() => this.props.navigation.navigate('QRCodeReader')}
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