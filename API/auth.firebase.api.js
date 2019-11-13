// import * as firebaseApp from 'firebase/app';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

// import 'firebase/auth';
// import 'firebase/firestore';
import { pick } from 'lodash';
import axios from 'axios';
import sleep from 'sleep-promise';

firebase.auth().settings.appVerificationDisabledForTesting = true;
const phoneNumber = '+16505554567';
const testVerificationCode = '123456';

const USER_PICK_FIELDS = [ 'email', 'displayName', 'phoneNumber', 'photoURL' ];

export const signInWithGoolge = async () => {
    await GoogleSignin.configure({
        scopes: [ 'https://www.googleapis.com/auth/drive.readonly' ],
        webClientId: process.env.REACT_NATIVE_APP_FIREBASE_WEB_CLIENT_ID
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
