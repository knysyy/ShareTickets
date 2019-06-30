import React, {Component} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from "react-redux";
import {styles} from './style';
import {commonStyle} from '../style/globalStyles';
import * as color from '../style/color';
import {getCameraPermission} from "../lib";
import {RNCamera} from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
import {addFriend} from "../../actions/friend/actions";

class QRCodeReader extends Component {

    componentDidMount() {
        const granted = getCameraPermission();
        if (!granted) {
            this.props.navigation.goBack();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.error === null && this.props.error !== null) {
            Alert.alert('エラー', this.props.error);
            this.props.navigation.goBack();
        }

        if(!prevProps.success && this.props.success) {
            Alert.alert('成功', '友達を追加しました');
            this.props.navigation.navigate('Home');
        }
    }

    onBarCodeRead(result) {
        if (result.data !== null) {
            this.props.addFriend(result.data);
        }
    }

    render() {
        const {loading} = this.props;
        return (
            <View style={styles.container}>
                {loading ?
                    <View style={commonStyle.container}>
                        <ActivityIndicator size="large" color={color.PRIMARY}/>
                    </View>
                    :
                    <RNCamera
                        style={styles.preview}
                        captureAudio={false}
                        onBarCodeRead={(result) => this.onBarCodeRead(result)}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    >
                        <BarcodeMask height={280} edgeColor={'white'} showAnimatedLine={false}/>
                    </RNCamera>
                }
            </View>
        )
    }
}

const mapStateToProps = ({friendReducer: {loading, error, success}}) => ({
    loading: loading,
    error: error,
    success: success
});

const mapDispatchToProps = {
    addFriend: addFriend
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QRCodeReader);