import React, {Component} from 'react';
import {connect} from "react-redux";
import {Alert, Dimensions, Modal, Text, TouchableOpacity, View} from 'react-native';
import Carousel from "react-native-snap-carousel";
import {Button, Card, Icon, Input} from "react-native-elements";
import ActionButton from "react-native-action-button";
import {addTicket, getTickets, hideModal, setFriendId, showModal} from "../../actions/ticket/actions";
import {buttonStyle, styles} from './style';
import {commonStyle, primaryButtonStyle, secondaryButtonStyle} from "../style/globalStyles";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDate} from "../lib";

const WINDOW_WIDTH = Dimensions.get("window").width;

class TicketList extends Component {

    state = {
        title: '',
        date: null,
        isDateTimePickerVisible: false
    };

    handleTitleChange = title => this.setState({title});

    handleDateChange = date => {
        this.setState({date});
        this.hideDateTimePicker();
    };

    showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    handleButtonPress = () => {
        const {title, date} = this.state;
        if (title === '' || date === '') {
            Alert.alert('Error', '未入力項目があります。');
            return;
        }
        this.props.addTicket(title, date);
    };

    componentDidMount() {
        const {navigation} = this.props;
        const friendId = navigation.getParam('friendId', null);
        this.props.setFriendId(friendId);
        if (friendId) {
            this.props.getTickets();
        } else {
            navigation.goBack();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.error === null && this.props.error !== null) {
            Alert.alert('Error', this.props.error);
            this.props.navigation.goBack();
        }
    }

    renderYourItem({item}) {
        const day = formatDate(item.expireDate.toDate());
        return (
            <Card
                title={item.title}
            >
                <View style={styles.dateStyle}>
                    <Text style={styles.dateStyle}>
                        期限日 : {day}
                    </Text>
                </View>
                <Button
                    title="使用する"
                    onPress={() => Alert.alert('', item.id)}
                    {...buttonStyle(WINDOW_WIDTH)}
                />
            </Card>
        )
    }

    renderFriendItem = ({item}) => {
        const day = formatDate(item.expireDate.toDate());
        return (
            <Card
                title={item.title}
            >
                <View style={styles.dateStyle}>
                    <Text style={styles.dateStyle}>
                        期限日 : {day}
                    </Text>
                </View>
            </Card>
        )
    };

    renderContent = (tickets, flag) => {
        if (tickets.length > 0) {
            return (
                <Carousel
                    data={tickets}
                    renderItem={flag ? this.renderYourItem : this.renderFriendItem}
                    sliderWidth={WINDOW_WIDTH}
                    itemWidth={WINDOW_WIDTH * 0.85}
                    layout={'default'}
                    loop
                />
            );
        } else {
            return (
                <Text>
                    まだチケットはありません。
                </Text>
            );
        }
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
                title="Add Ticket"
                {...primaryButtonStyle}
                onPress={this.handleButtonPress}
            />
        }
    };

    // TODO 友達の情報を表示したい。
    render() {
        const {loading, yourTickets, friendTickets} = this.props;
        return (
            <View style={commonStyle.container}>
                <View style={styles.boxStyle}>
                    <Text style={commonStyle.headingStyle}>
                        Your Tickets
                    </Text>
                    {loading ? null : this.renderContent(yourTickets, true)}
                </View>
                <View style={styles.boxStyle}>
                    <Text style={commonStyle.headingStyle}>
                        Friend Tickets
                    </Text>
                    {loading ? null : this.renderContent(friendTickets, false)}
                </View>
                <ActionButton
                    buttonColor="#FF513F"
                    onPress={() => this.props.showModal()}
                />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.props.visible}
                >
                    <View style={styles.modalStyle}>
                        <Text style={commonStyle.headingStyle}>
                            Add Tickets
                        </Text>
                        <Input
                            leftIcon={
                                <Icon
                                    name="format-title"
                                    type="material-community"
                                    color="rgba(110, 110, 110, 1)"
                                    size={25}
                                />
                            }
                            placeholder="Title"
                            autoCapitailze="none"
                            autoCorrect={false}
                            returnKeyType="done"
                            onChangeText={this.handleTitleChange}
                            value={this.state.title}
                        />
                        <TouchableOpacity
                            onPress={() => this.showDateTimePicker()}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="calendar"
                                        type="material-community"
                                        color="rgba(110, 110, 110, 1)"
                                        size={25}
                                    />
                                }
                                placeholder="Expire Date"
                                editable={false}
                                value={this.state.date ? formatDate(this.state.date) : ''}
                            />
                        </TouchableOpacity>
                        {this.renderButton()}
                        <Button
                            title="Close"
                            type="clear"
                            {...secondaryButtonStyle}
                            onPress={() => this.props.hideModal()}
                        />
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDateChange}
                            onCancel={this.hideDateTimePicker}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = ({ticketReducer: {yourTickets, friendTickets, friendId, loading, visible, error}, friendReducer: {friends}}) => ({
    loading: loading,
    yourTickets: yourTickets,
    friendTickets: friendTickets,
    friends: friends,
    friendId: friendId,
    visible: visible,
    error: error
});

const mapDispatchToProps = {
    setFriendId: setFriendId,
    getTickets: getTickets,
    showModal: showModal,
    hideModal: hideModal,
    addTicket: addTicket
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketList);