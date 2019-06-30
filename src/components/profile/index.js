import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import {Avatar, Button, Icon, Input} from "react-native-elements";
import {logoutUser} from "../../actions/auth/actions";
import {logoutReset} from "../../actions/route/actions";
import {commonStyle, primaryButtonStyle} from "../style/globalStyles";
import {styles} from "./style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {getProfile, setEmail, setName} from "../../actions/profile/actions";

const defaultIcon = require('../../../assets/icon/default_user.png');

class ProfileForm extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <View />,
            headerRight: (
                <TouchableOpacity
                    style={styles.headerIconRight}
                    onPress={navigation.getParam('logout')}>
                    <Icon
                        name="logout"
                        type="simple-line-icon"
                        color="rgba(110, 110, 110, 1)"
                        size={30}
                    />
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        this.props.getProfile();
        this.props.navigation.setParams({
            logout: this._logout
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    _logout = () => {
        this.props.logout();
    };

    state = {previousPassword: '', password: ''};

    handlePreviousPasswordChange = previousPassword => this.setState({previousPassword});

    handlePasswordChange = password => this.setState({password});

    handleButtonPress = () => {
        const {previousPassword, password} = this.state;
    };

    renderButton = () => {
        const {loading} = this.props;
        if (loading) {
            return <Button
                {...primaryButtonStyle}
                loading
            />
        } else {
            return <Button
                title="Edit Profile"
                {...primaryButtonStyle}
                onPress={this.handleButtonPress}
            />
        }
    };

    // TODO プロファイルを編集できるようにする。
    render() {
        const {email, displayName, avatar} = this.props;
        const source = avatar ? {uri: avatar} : defaultIcon;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.contentView}>
                        <Text style={commonStyle.headingStyle}>
                            Profile
                        </Text>
                        <Avatar
                            rounded
                            size="large"
                            source={source}
                        />
                        <Input
                            leftIcon={
                                <Icon
                                    name="user"
                                    type="simple-line-icon"
                                    color="rgba(110, 110, 110, 1)"
                                    size={25}
                                />
                            }
                            placeholder="Username"
                            autoCapitailze="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="done"
                            onChangeText={this.props.setName}
                            value={displayName}
                        />
                        <Input
                            leftIcon={
                                <Icon
                                    name="email-outline"
                                    type="material-community"
                                    color="rgba(110, 110, 110, 1)"
                                    size={25}
                                />
                            }
                            placeholder="Email"
                            autoCapitailze="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={this.props.setEmail}
                            value={email}
                        />
                        <Input
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="simple-line-icon"
                                    color="rgba(110, 110, 110, 1)"
                                    size={25}
                                />
                            }
                            placeholder="Previous Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="done"
                            onChangeText={this.handlePreviousPasswordChange}
                            value={this.state.previousPassword}
                        />
                        <Input
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="simple-line-icon"
                                    color="rgba(110, 110, 110, 1)"
                                    size={25}
                                />
                            }
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="done"
                            onChangeText={this.handlePasswordChange}
                            value={this.state.password}
                        />
                        {this.renderButton()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({authReducer: {logged}, profileReducer: {loading, error, success, email, displayName, avatar}}) => ({
    logged: logged,
    loading: loading,
    error: error,
    success: success,
    email: email,
    displayName: displayName,
    avatar: avatar
});

const mapDispatchToProps = {
    logout: logoutUser,
    getProfile: getProfile,
    setName: setName,
    setEmail: setEmail
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);