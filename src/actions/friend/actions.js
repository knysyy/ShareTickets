import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const getFriend = () => (dispatch, getState) => {
    dispatch(getStart());

    const { authReducer: { user } } = getState();

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
                Object.assign(friend, { uid: query.id });
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