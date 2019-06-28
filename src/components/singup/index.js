import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {signupUser} from '../../actions/auth/actions';
import {Button, Icon, Input} from "react-native-elements";
import {styles} from './style';
import {commonStyle, primaryButtonStyle, secondaryButtonStyle} from "../style/globalStyles";

// TODO displayNameをauthではなくusersのfieldを更新する。
class SignupForm extends Component {

    static navigationOptions = {
        headerRight: <View/>
    };

    componentDidMount(): void {
        if (this.props.registered) {
            this.props.navigation.navigate('Home');
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
        this.props.signup(email, password);
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
                title="SignUp"
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
                        <Text style={commonStyle.headingStyle}>
                            SingUp
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
                        {this.renderButton()}
                        <Button
                            title="Login"
                            type="clear"
                            {...secondaryButtonStyle}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({authReducer: {loading, error, registered}}) => ({
    loading: loading,
    error: error,
    registered: registered
});

const mapDispatchToProps = {
    signup: signupUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);