import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {editName} from '../../actions/edit/actions';
import {restoreSession} from "../../actions/auth/actions";
import {primaryButtonStyle, styles} from "./style";

class EditForm extends Component {

    componentDidUpdate(prefProps, prevState, snapshot) {
        if (this.props.registered) {
            this.props.restore();
            this.props.navigation.navigate('Home');
        }
    }

    state = {displayName: ''};

    handleNameChange = displayName => this.setState({displayName});

    handleButtonPress = () => {
        const {displayName} = this.state;
        if (displayName === "") {
            Alert.alert('エラー', '入力してください');
            return;
        }
        this.props.editName(displayName);
    };

    getButton = () => {
        const {loading} = this.props;
        if (loading) {
            return <Button
                {...primaryButtonStyle}
                loading
            />
        } else {
            return <Button
                title="Register"
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
                            Edit
                        </Text>
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
                            onChangeText={this.handleNameChange}
                            value={this.state.displayName}
                        />
                        {this.getButton()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({editReducer: {loading, error, registered}, authReducer: {user}}) => ({
    loading: loading,
    error: error,
    registered: registered,
    user: user
});

const mapDispatchToProps = {
    editName: editName,
    restore: restoreSession
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditForm);