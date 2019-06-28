import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import {Card, ListItem} from "react-native-elements";
import ActionButton from 'react-native-action-button';
import {styles} from './style';
import {editReset, logoutReset} from "../../actions/route/actions";
import {getFriend} from "../../actions/friend/actions";

const defaultIcon = require('../../../assets/icon/default_user.png');

class FriendList extends Component {

    componentDidMount() {
        if (this.props.user.user && !this.props.user.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        if (!this.props.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        this.props.getFriend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    renderContent = (friends) => {
        if (friends.length > 0) {
            return (
                <Card containerStyle={{padding: 0, marginBottom: 10}}>
                    {
                        friends.map((friend) => {
                            const source = friend.avatar ? {uri: friend.avatar} : defaultIcon;
                            return (
                                <ListItem
                                    key={friend.uid}
                                    title={friend.displayName}
                                    leftAvatar={{source: source}}
                                    onPress={() => this.props.navigation.navigate('TicketList', {
                                        friendId: friend.uid
                                    })}
                                    roundAvatar
                                    chevron
                                    topDivider
                                    bottomDivider
                                />
                            );
                        })
                    }
                </Card>
            );
        } else {
            return (
                <View style={styles.boxStyle}>
                    <Text>
                        まだ友達がいません。
                    </Text>
                </View>
            );
        }
    };

    render() {
        const {loading, friends} = this.props;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    {loading ? null : this.renderContent(friends)}
                </ScrollView>
                <ActionButton
                    buttonColor="#FF513F"
                    onPress={() => this.props.navigation.navigate('Add Friend')}
                />
            </View>
        )
    }
}

const mapStateToProps = ({authReducer: {user, logged}, friendReducer: {loading, friends, error}}) => ({
    user: user,
    logged: logged,
    loading: loading,
    friends: friends,
    error: error
});

const mapDispatchToProps = {
    getFriend: getFriend
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendList);