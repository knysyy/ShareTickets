import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {connect} from "react-redux";

class QRCodeReader extends Component {

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QRCodeReader);