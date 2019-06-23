import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Card, ListItem} from "react-native-elements";
import {connect} from 'react-redux';
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

    render() {
        const {loading, friends} = this.props;
        return (
            <ScrollView style={styles.container}>
                {loading ? null :
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
                }
            </ScrollView>
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