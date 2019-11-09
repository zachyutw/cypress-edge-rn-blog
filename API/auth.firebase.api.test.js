import { signInWithEmailAndPassword, createUserWithEmailAndPassword, userDelete, updateProfile, signOut, sendSignInLinkToEmail } from './auth.firebase.api';
import sleep from 'sleep-promise';
import expectExport from 'expect';
const TEST_MAIL = 'jslandclan@gmail.com';
const TEST_PASSWORD = 'Qwer1234';
const TEST_DISPLAY_NAME = 'Yo Yo Test';
const TEST_PHONE_NUMBER = '+16397606767';
const TEST_PHOTO_URL = 'https://i.imgur.com/pUaEfKb.png';
jest.setTimeout(30000);
const ClearAuth = async ({ email, password }) => {
    console.log('111');
    const result = await signInWithEmailAndPassword({ email, password })
        .then((res) => {
            return { message: 'has user', email, password };
        })
        .catch(() => ({ message: 'init success', email, password }));
    console.log(result);

    if (result.message === 'has user') {
        console.log('222');
        const deleted = await userDelete();
        console.log(deleted);
        return { message: 'init success', email, password };
    } else {
        console.log('333');
        return result;
    }
};

describe('firebase auth flow', () => {
    // const email = TEST_MAIL;
    // const password = TEST_PASSWORD;

    test('test firebase auth flow', async () => {
        // const { email, password, message } = await ClearAuth({ email: TEST_MAIL, password: TEST_PASSWORD });
        // await sleep(300);
        // expectExport(message).toEqual('init success');
        // // await sleep(300);
        // await sleep(300);
        // const signUpPayload = await createUserWithEmailAndPassword({ email, password }).catch(async (error) => {
        //     console.log(error.message);
        //     if (error.message === 'The email address is already in use by another account.') {
        //         return await signInWithEmailAndPassword({ email, password });
        //     } else {
        //         throw error;
        //     }
        // });
        // expectExport(signUpPayload.user.email).toEqual(TEST_MAIL);
        // await sleep(300);
        // await sendSignInLinkToEmail({ email: TEST_MAIL });
        // await sleep(300);
        // await signOut();
        // await sleep(300);
        // await signInWithEmailAndPassword({ email, password });
        // await sleep(300);
        // const updatedPayload = await updateProfile({ displayName: TEST_DISPLAY_NAME, phoneNumber: TEST_PHONE_NUMBER, photoURL: TEST_PHOTO_URL });
        // expectExport(updatedPayload.user.displayName).toEqual(TEST_DISPLAY_NAME);
    });
});
