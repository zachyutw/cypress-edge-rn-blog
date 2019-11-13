import React, { createContext, useCallback, useReducer, useState, useMemo, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithGoolge, updateProfile } from '../../API/auth.firebase.api';
import { pushTo } from '../../components/Routes/Routes';
import _ from 'lodash';
import { dispatchAction } from '../lib';
import localStorageSafe from '../../utls/localStorageSafe';
const Context = createContext({});

export let globalAuthState = {};
let initState = {
    actionType: 'init',
    user: {},
    auth: {},
    condition: { error: { message: null } }
};
const initAction = async (dispatch) =>
    await localStorageSafe.getItem('auth').then((value) => {
        if (value) {
            dispatch({ actionType: 'init', payload: value });
            return value;
        } else {
            dispatch({ actionType: 'init', payload: initState });
            return initState;
        }
    });

export const reducer = (state, action = {}) => {
    const { actionType } = action;

    const payload = action.payload || {};
    switch (actionType) {
        case 'init':
            return { ...state, ...payload };
        case 'getAuth':
            localStorageSafe.setItem('auth', payload);
            // console.obj(payload);
            return { ...state, ...payload };
        case 'initCheck':
            // console.obj(state);
            if (state.user.email) {
                pushTo('ODDatasetList');
            }
            return { ...state };
        default:
            // console.log('reducer ', action);
            return { ...state };
    }
};

export const Provider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const signUpEmailAction = useCallback(dispatchAction(dispatch, createUserWithEmailAndPassword, 'getAuth'), [ dispatch ]);
    const loginEmailAction = useCallback(dispatchAction(dispatch, signInWithEmailAndPassword, 'getAuth'), [ dispatch ]);
    const signOutAction = useCallback(dispatchAction(dispatch, signOut, 'getAuth'), [ dispatch ]);
    const signInWithGoolgeAction = useCallback(dispatchAction(dispatch, signInWithGoolge, 'getAuth'), [ dispatch ]);
    const updateProfileAction = useCallback(dispatchAction(dispatch, updateProfile, 'getAuth'), [ dispatch ]);

    useEffect(() => {
        initAction(dispatch).then((data) => {
            if (data.user.email) {
                pushTo('ODDatasetList');
            }
        });
        // loginEmailAction({ email: 'jslandclan@gmail.com', password: 'Qwer1234' });
    }, []);

    const _onLoad = useCallback((action = {}) => {
        const { routeName, actionType } = action;
        // console.log(action);
        switch (routeName) {
            case 'Auth':
                // localStorageSafe.getItem('auth').then((data) => {
                //     if (data.user.email) {
                //         navigator.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
                //     } else {
                //         console.obj(data);
                //     }
                // });
                break;
            case 'AuthLogin':
                dispatch({ actionType: 'initCheck' });
                break;
            default:
                break;
        }
        switch (actionType) {
            default:
                break;
        }
    }, []);
    const _onChange = useCallback((action = {}) => {
        const { actionType, payload } = action;
        switch (actionType) {
            case 'signUpEmail':
                signUpEmailAction(payload);
                break;
            case 'signInGoogle':
                signInWithGoolgeAction({}).then(() => pushTo('ODDatasetList')).catch((error) => console.log(error));
                break;
            case 'signOut':
                signOutAction();
                break;
            case 'loginEmail':
                loginEmailAction(payload).then(() => pushTo('ODDatasetList')).catch((error) => console.log(error));
                break;
            case 'updateProfile':
                updateProfileAction(payload);
                break;
            default:
                console.log(data);
                break;
        }
    }, []);
    useEffect(
        () => {
            // console.obj(state);
        },
        [ state ]
    );
    // console.obj(state);
    return <Context.Provider value={{ state, onChange: _onChange, onLoad: _onLoad }}>{props.children}</Context.Provider>;
};

export const withContext = (Componet) => (props) => {
    return (
        <Provider>
            <Componet {...props} />
        </Provider>
    );
};

export default Context;
