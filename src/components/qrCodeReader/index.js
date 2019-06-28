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
            Alert.alert('Error', this.props.error);
            this.props.navigation.goBack();
        }
    }

    onBarCodeRead(result) {
        if (result.data !== null) {
            this.props.addFriend(result.data);
        }
    }

    // TODO QRコードを読み込んだ後に友達登録を行う。
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
                        <Button title="登録" onPress={() => this.props.addFriend('KipCD5vIa1eTObOA3KFeo6JQhkS2')}/>
                    </RNCamera>
                }
            </View>
        )
    }
}

const mapStateToProps = ({friendReducer: {loading, error}}) => ({
    loading: loading,
    error: error
});

const mapDispatchToProps = {
    addFriend: addFriend
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QRCodeReader);