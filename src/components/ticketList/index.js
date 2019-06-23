import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {styles} from './style';
import {connect} from "react-redux";

class TicketList extends Component {

    render() {
        const {navigation} = this.props;
        const friendId = navigation.getParam('friendId', null);

        return (
            <View style={styles.container}>
                <Text>
                    {friendId}
                </Text>
            </View>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketList);