import firebase from 'react-native-firebase';
import uuid from 'react-native-uuid';
import * as types from './actionsTypes';
import {ToastAndroid} from "react-native";

export const setFriendId = (friendId) => dispatch => {
    dispatch({
        type: types.SET_FRIEND_ID,
        friendId
    });
};

export const getTickets = () => async (dispatch, getState) => {
    dispatch(getStart());
    const {authReducer: {user}, ticketReducer: {friendId}} = getState();
    const ticketsStore = firebase.firestore().collection('tickets');
    try {
        const yourTickets = await ticketsStore
            .doc(user.uid)
            .collection(friendId)
            .get()
            .then((snapshot) => {
                let tickets = [];
                snapshot.forEach((query) => {
                    let ticket = query.data();
                    Object.assign(ticket, {id: query.id});
                    tickets.push(ticket);
                });
                return tickets;
            });
        const friendTickets = await ticketsStore
            .doc(friendId)
            .collection(user.uid)
            .get()
            .then((snapshot) => {
                let tickets = [];
                snapshot.forEach((query) => {
                    let ticket = query.data();
                    Object.assign(ticket, {id: query.id});
                    tickets.push(ticket);
                });
                return tickets;
            });
        dispatch(getSuccess(yourTickets, friendTickets));
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const addTicket = (title, date) => async (dispatch, getState) => {
    dispatch(addStart());
    const {authReducer: {user}, ticketReducer: {friendId, friendTickets}} = getState();
    const timestamp = firebase.firestore.Timestamp.fromDate(date);
    const id = uuid.v4();
    try {
        const docRef = await firebase
            .firestore()
            .collection('tickets')
            .doc(friendId)
            .collection(user.uid)
            .add({
                title: title,
                expireDate: timestamp
            });
        const ticket = await docRef
            .get()
            .then((snapshot) => {
                let ticket = snapshot.data();
                Object.assign(ticket, {id: snapshot.id});
                return ticket;
            });
        friendTickets.push(ticket);
        ToastAndroid.showWithGravity(
            'チケットを発行しました',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        dispatch(addSuccess(friendTickets));
    } catch (error) {
        dispatch(addError(error.message));
    }
};

const getStart = () => ({
    type: types.GET_TICKETS_START
});

const getSuccess = (yourTickets, friendTickets) => ({
    type: types.GET_TICKETS_SUCCESS,
    yourTickets: yourTickets,
    friendTickets: friendTickets
});

const getError = (error) => ({
    type: types.GET_TICKETS_ERROR,
    error
});

export const showModal = () => dispatch => {
    dispatch({type: types.SHOW_MODAL});
};

export const hideModal = () => dispatch => {
    dispatch({type: types.HIDE_MODAL});
};

const addStart = () => ({
    type: types.ADD_TICKET_START
});

const addSuccess = (friendTickets) => ({
    type: types.ADD_TICKET_SUCCESS,
    friendTickets
});

const addError = (error) => ({
    type: types.ADD_TICKET_ERROR,
    error
});