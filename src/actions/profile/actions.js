import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const getProfile = () => (dispatch, getState) => {
    dispatch(getStart());
    const {authReducer: {user}} = getState();
    firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(snapshot => {
            const userData = snapshot.data();
            dispatch(getSuccess(user.email, userData.displayName, userData.avatar));
        })
        .catch(error => {
            dispatch(getError(error.message));
        })
};

const getStart = () => ({
    type: types.GET_START
});

const getSuccess = (email, displayName, avatar) => ({
    type: types.GET_SUCCESS,
    email,
    displayName,
    avatar
});

const getError = (error) => ({
    type: types.GET_ERROR,
    error
});

export const setName = (name) => dispatch => {
    dispatch({
        type: types.SET_NAME,
        name
    });
};

export const setEmail = (email) => dispatch => {
    dispatch({
        type: types.SET_EMAIL,
        email
    });
};