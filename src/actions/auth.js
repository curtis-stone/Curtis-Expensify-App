import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin  = () => {
    return (dispatch) => {
        return firebase.auth().signInWithPopup(googleAuthProvider) 
        // return in chain so others can attatch to it
        // signInWIthPopop takes provider as only arg
    }
}

export const logout = (uid) => ({
    type: 'LOGOUT'
});

export const startLogout  = () => {
    return (dispatch) => {
        return firebase.auth().signOut();
        // return in chain so others can attatch to it
        // signOut() takes no arg's
    }
}