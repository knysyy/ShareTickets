import firebase from 'react-native-firebase';
import * as types from './actionsTypes';

export const restoreSession = () => dispatch => {
    dispatch(sessionLoading());
    dispatch(sessionRestoring());

    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                dispatch(sessionSuccess(user));
            } else {
                dispatch(sessionLogout());
            }
        });
};

export const loginUser = (email, password) => dispatch => {
    dispatch(sessionLoading());

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            dispatch(sessionSuccess(userCredential.user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const signupUser = (email, password) => dispatch => {
    dispatch(sessionLoading());

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            dispatch(sessionSuccess(userCredential.user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const logoutUser = () => dispatch => {
    dispatch(sessionLoading());

    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(sessionLogout());
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

const sessionRestoring = () => ({
    type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
    type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
});
