import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/auth/actions";
import {editReset, logoutReset} from "../../actions/route/actions";
import { styles } from './style';

class Home extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <View />,
            headerRight: (
                <TouchableOpacity
                    style={styles.headerIconRight}
                    onPress={navigation.getParam('logout')}>
                    <Icon name="logout" size={30} color="#fff" />
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        if(this.props.user.user && !this.props.user.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        if(!this.props.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        this.props.navigation.setParams({
            logout: this._logout
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    _logout = () => {
        this.props.logout();
    };

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

const mapDispatchToProps = {
    logout: logoutUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);