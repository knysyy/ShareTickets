import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const editName = (displayName) => (dispatch, getState) => {
    const {authReducer: {user}} = getState();
    dispatch(editStart());

    firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
            displayName: displayName
        })
        .then(() => {
            dispatch(editSuccess());
        })
        .catch((error) => {
            dispatch(editError(error.message));
        });
};

const editStart = () => ({
    type: types.EDIT_START
});

const editSuccess = () => ({
    type: types.EDIT_SUCCESS
});

const editError = error => ({
    type: types.EDIT_ERROR,
    error
});