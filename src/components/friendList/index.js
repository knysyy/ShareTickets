import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Card, ListItem} from "react-native-elements";
import {connect} from 'react-redux';
import {styles} from './style';
import {editReset, logoutReset} from "../../actions/route/actions";

const defaultIcon = require('../../../assets/icon/default_user.png');

class FriendList extends Component {

    componentDidMount() {
        if (this.props.user.user && !this.props.user.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
        if (!this.props.user.displayName) {
            this.props.navigation.dispatch(editReset);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.logged) {
            this.props.navigation.dispatch(logoutReset);
        }
    }

    render() {
        const friends = [
            {
                id: 'dfalkdjfalsdkj',
                name: 'abc',
                avatar: ''
            },
            {
                id: 'aslkjfasdjf',
                name: 'abc',
                avatar: ''
            },
            {
                id: 'fkaslkdjfasd',
                name: 'abc',
                avatar: ''
            },
            {
                id: 'faslkjfasdkl',
                name: 'abc',
                avatar: ''
            },
            {
                id: 'faskljfasdlkjf',
                name: 'abc',
                avatar: ''
            }
        ];
        return (
            <ScrollView style={styles.container}>
                <Card containerStyle={{padding: 0, marginBottom: 10}}>
                    {
                        friends.map((friend) => {
                            const source = friend.avatar ? {uri: friend.avatar} : defaultIcon;
                            return (
                                <ListItem
                                    key={friend.id}
                                    title={friend.name}
                                    leftAvatar={{source: source}}
                                    onPress={() => this.props.navigation.navigate('TicketList', {
                                        friendId: friend.id
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
            </ScrollView>
        )
    }
}

const mapStateToProps = ({authReducer: {loading, user, logged}}) => ({
    loading: loading,
    user: user,
    logged: logged
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendList);