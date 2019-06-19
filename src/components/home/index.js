import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import {editReset, logoutReset} from "../../actions/route/actions";

class Home extends Component {

    componentDidMount() {
        if(this.props.user.user && !this.props.user.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        if(!this.props.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    // TODO 友達のリストを表示する。
    render() {
        return (
            <View style={styles.container}>
                <Text>home</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ authReducer: { loading, user, logged} }) => ({
    loading: loading,
    user: user,
    logged: logged
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);