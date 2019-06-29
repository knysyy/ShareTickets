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

export const addFriend = (friendId) => async (dispatch, getState) => {
    const {authReducer: {user}} = getState();
    const {friendReducer: {friends, loading}} = getState();
    const userId = user.uid;

    if (loading) {
        return;
    }

    dispatch(addStart());
    const usersRef = firebase.firestore().collection('users');
    const userRef = usersRef.doc(userId);
    const friendRef = usersRef.doc(friendId);
    const userFriendRef = usersRef.doc(userId).collection('friends').doc(friendId);
    const friendUserRef = usersRef.doc(friendId).collection('friends').doc(userId);
    try {
        var batch = firebase.firestore().batch();
        const friendSnap = await friendRef.get();
        if (!friendSnap.exists) {
            throw {message: "友達が存在しません"};
        }
        const userFriend = await userFriendRef.get();
        if (userFriend.exists) {
            throw {message: "すでに友達が登録されています"};
        }
        const userData = await userRef.get();
        const friend = friendSnap.data();

        batch.set(userFriendRef, friend);
        batch.set(friendUserRef, userData.data());
        await batch.commit();

        Object.assign(friend, {uid: friendId});
        friends.push(friend);
        dispatch(addSuccess(friends));
    } catch (error) {
        console.log(error);
        dispatch(addError(error.message));
    }
};

const addStart = () => ({
    type: types.ADD_FRIEND_START
});

const addSuccess = (friends) => ({
    type: types.ADD_FRIEND_SUCCESS,
    friends
});

const addError = (error) => ({
    type: types.ADD_FRIEND_ERROR,
    error
});