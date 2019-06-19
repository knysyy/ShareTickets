import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const editName = (displayName) => dispatch => {
    dispatch(editStart());

    firebase
        .auth()
        .currentUser
        .updateProfile({
            displayName: displayName
        })
        .then(() => {
            dispatch(editSuccess());
        })
        .catch(error => {
            dispatch(editError(error.message));
        })
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