import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from "react-redux";
import {Button} from "react-native-elements";
import {logoutUser} from "../../actions/auth/actions";
import {logoutReset} from "../../actions/route/actions";
import {commonStyle, secondaryButtonStyle} from "../style/globalStyles";

class ProfileForm extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    // TODO プロファイルを編集できるようにする。
    render() {
        return (
            <View style={commonStyle.container}>
                <Text>Profile</Text>
                <Button
                    title='Logout'
                    type='clear'
                    {...secondaryButtonStyle}
                    onPress={() => this.props.logout()}
                />
            </View>
        )
    }
}

const mapStateToProps = ({authReducer: {logged}}) => ({
    logged: logged
});

const mapDispatchToProps = {
    logout: logoutUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);