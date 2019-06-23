import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button, Icon, Input} from 'react-native-elements';
import {loginUser, restoreSession} from "../../actions/auth/actions";
import {loggedReset} from "../../actions/route/actions";
import {primaryButtonStyle, secondaryButtonStyle, styles} from './style';

class LoginForm extends Component {

    componentDidMount() {
        this.props.restore();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {error, logged} = this.props;

        if (!prevProps.error && error) Alert.alert('エラー', error);

        if (logged) {
            this.props.navigation.dispatch(loggedReset);
        }
    }

    state = {email: '', password: ''};

    handleEmailChange = email => this.setState({email});

    handlePasswordChange = password => this.setState({password});

    handleButtonPress = () => {
        const {email, password} = this.state;
        if (email === "" || password === "") {
            Alert.alert('エラー', '未入力項目があります');
            return;
        }
        this.props.login(email, password);
    };

    // TODO Login, SignUp, Editで使用しているので共通化したい
    getButton = () => {
        const {loading} = this.props;
        if (loading) {
            return <Button
                {...primaryButtonStyle}
                loading
            />
        } else {
            return <Button
                title="Login"
                {...primaryButtonStyle}
                onPress={this.handleButtonPress}
            />
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.contentView}>
                        <Text
                            style={styles.textStyle}
                        >
                            Login
                        </Text>
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
                            onChangeText={this.handleEmailChange}
                            value={this.state.email}
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
                        {this.getButton()}
                        <Button
                            title="SignUp"
                            type="clear"
                            {...secondaryButtonStyle}
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({authReducer: {restoring, loading, user, error, logged}}) => ({
    restoring: restoring,
    loading: loading,
    user: user,
    error: error,
    logged: logged
});

const mapDispatchToProps = {
    login: loginUser,
    restore: restoreSession
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);