import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { styles } from "./style";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { logoutUser } from "../../actions/auth/actions";
import { logoutReset } from "../../actions/route/actions";

class ProfileForm extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    // TODO プロファイルを編集できるようにする。
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button
                    title='Logout'
                    {...styles.logoutButton}
                    onPress={() => this.props.logout()}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ authReducer: { logged }}) => ({
    logged: logged
});

const mapDispatchToProps = {
    logout: logoutUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);