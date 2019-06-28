import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const getFriend = () => (dispatch, getState) => {
    dispatch(getStart());

    const {authReducer: {user}} = getState();

    firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friends')
        .get()
        .then((snapshot) => {
            let friends = [];
            snapshot.forEach((query) => {
                let friend = query.data();
                Object.assign(friend, {uid: query.id});
                friends.push(friend);
            });
            dispatch(getSuccess(friends));
        })
        .catch(error => {
            dispatch(getError(error.message));
        })
};

const getStart = () => ({
    type: types.GET_FRIEND_START
});

const getSuccess = (friends) => ({
    type: types.GET_FRIEND_SUCCESS,
    friends
});

const getError = error => ({
    type: types.GET_FRIEND_ERROR,
    error
});

export const addFriend = (userId) => async (dispatch, getState) => {
    const {authReducer: {user}, friendReducer: {friends, loading}} = getState();
    if (loading) {
        return;
    }
    dispatch(addStart());
    const firestore = firebase.firestore();
    try {
        const friend = await firestore
            .collection('users')
            .doc(userId)
            .get()
            .then((snapshot) => {
                if (!snapshot.exists) {
                    throw {message: "友達が存在しません"};
                }
                return snapshot.data();
            });
        firestore
            .collection('users')
            .doc(user.uid)
            .collection('friends')
            .doc(userId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    throw {message: "すでに登録されています"};
                }
                return snapshot.ref.set(friend);
            });
        const userData = firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                return snapshot.data();
            });

        await firestore
            .collection('users')
            .doc(userId)
            .collection('friends')
            .doc(user.uid)
            .set(userData);

        dispatch(addSuccess());
    } catch (error) {
        dispatch(addError(error.message));
    }
};

const addStart = () => ({
    type: types.ADD_FRIEND_START
});

const addSuccess = () => ({
    type: types.ADD_FRIEND_SUCCESS,
});

const addError = (error) => ({
    type: types.ADD_FRIEND_ERROR,
    error
});