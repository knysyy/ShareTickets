import React, { Component } from 'react';
import { View, Text} from 'react-native';

import { styles } from './style';
import { connect } from "react-redux";

class AddTickets extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Add Tickets
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
)(AddTickets);