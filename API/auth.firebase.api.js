// import * as firebaseApp from 'firebase/app';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

// import 'firebase/auth';
// import 'firebase/firestore';
import { pick } from 'lodash';
import axios from 'axios';
import sleep from 'sleep-promise';
// export const firebase = firebaseApp.initializeApp({
//     apiKey: 'AIzaSyDBxx4lyOoBJDpKlLS7ye_IomI1O4UVsME',
//     authDomain: 'project-id.firebaseapp.com',
//     appID: '1:571377425932:web:f7a9159544dcfbffc2d829',
//     storageBucket: 'gs://soy-haven-237204.appspot.com/images'
// });
firebase.auth().settings.appVerificationDisabledForTesting = true;
const phoneNumber = '+16505554567';
const testVerificationCode = '123456';
// const appVerifier = new firebaseApp.auth.RecaptchaVerifier('root');
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// googleProvider.setCustomParameters({
//     login_hint: 'user@example.com'
// });

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(function () {
//         // Existing and future Auth states are now persisted in the current
//         // session only. Closing the window would clear any existing state even
//         // if a user forgets to sign out.
//         // ...
//         // New sign-in will be persisted with session persistence.
//         return firebase.auth().signInWithEmailAndPassword(email, password);
//     })
//     .catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });

// firebase.auth().currentUser.getIdToken(true).then((idTokern) => {
//     console.log(idTokern);
// });

const USER_PICK_FIELDS = [ 'email', 'displayName', 'phoneNumber', 'photoURL' ];

export const signInWithGoolge = async () => {
    await GoogleSignin.configure({
        scopes: [ 'https://www.googleapis.com/auth/drive.readonly' ],
        webClientId: '571377425932-s5q178astnv9rvu1ka876hrr6c5ej0k5.apps.googleusercontent.com' // required
    });
    const { accessToken, idToken } = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    const user = await firebase.auth().signInWithCredential(credential).then((result) => result.user);
    return { user: pick(user, USER_PICK_FIELDS), auth: user };
};

export const signInWithEmailAndPassword = async ({ email, password }) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password).then(() => firebase.auth().currentUser);
    // console.obj(user);
    return { user: pick(user, USER_PICK_FIELDS), auth: user };
};

export const signInWithPhoneNumber = async ({ phoneNumber, appVerifier }) => {
    const user = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => confirmationResult.confirm(testVerificationCode)).then(() => firebase.auth().currentUser);
    return { user: pick(user, USER_PICK_FIELDS), auth: user };
};

export const createUserWithEmailAndPassword = async ({ email, password }) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => firebase.auth().currentUser);
    return { user: pick(user, USER_PICK_FIELDS), auth: user };
};
export const userDelete = async () => {
    return await firebase.auth().currentUser.delete().then(async (resp) => {
        await signOut();
        return { message: `delele  success`, user: {}, auth: {} };
    });
};
export const signOut = async () => {
    return await firebase.auth().signOut().then(() => ({ message: `signOut   success`, user: {}, auth: {} }));
};

export const updateProfile = async (data) => {
    const user = (await firebase.auth().currentUser.updateProfile(data).then(() => firebase.auth().currentUser)) || {};
    return { user: pick(user, USER_PICK_FIELDS) };
};

export const sendSignInLinkToEmail = async ({ email }) => {
    const actionCodeSettings = {
        url: 'http://localhost:3000/auth/verifyEmail?email=' + firebase.auth().currentUser.email,
        handleCodeInApp: true
    };
    await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    return { message: `verificatoin ${email}` };
};
