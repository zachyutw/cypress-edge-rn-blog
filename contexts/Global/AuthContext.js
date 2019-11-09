import React, { createContext, useCallback, useReducer, useState, useMemo, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../../API/auth.firebase.api';
import { navigator } from '../../components/Routes/Routes';
import { NavigationActions, StackActions, NavigationAction } from 'react-navigation';

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
const initAction = (dispatch) => {
    localStorageSafe.getItem('auth').then((value) => {
        if (value) {
            dispatch({ actionType: 'init', payload: value });
        }
    });
};

export const reducer = (state, action = {}) => {
    const { actionType } = action;
    const payload = action.payload || {};
    switch (actionType) {
        case 'init':
            return { ...state, ...payload };
        case 'getAuth':
            localStorageSafe.setItem('auth', payload);
            auth = payload;
            // console.obj(payload);
            return { ...state, ...payload };
        default:
            // console.log('reducer ', action);
            return { ...state };
    }
};
const link2Work = NavigationActions.navigate({
    routeName: 'Work',
    params: {},

    action: NavigationActions.navigate({ routeName: 'Work' })
});

export const Provider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const signUpEmailAction = useCallback(dispatchAction(dispatch, createUserWithEmailAndPassword, 'getAuth'), [ dispatch ]);
    const loginEmailAction = useCallback(dispatchAction(dispatch, signInWithEmailAndPassword, 'getAuth'), [ dispatch ]);
    const signOutAction = useCallback(dispatchAction(dispatch, signOut, 'getAuth'), [ dispatch ]);

    useEffect(() => {
        initAction(dispatch);
        // loginEmailAction({ email: 'jslandclan@gmail.com', password: 'Qwer1234' });
    }, []);

    const _onLoad = useCallback((data = {}) => {
        const { routeName, actionType } = data;
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
            default:
                break;
        }
        switch (actionType) {
            default:
                break;
        }
    }, []);
    const _onChange = useCallback((data = {}) => {
        const { actionType } = data;
        switch (actionType) {
            case 'signUpEmail':
                signUpEmailAction(data);
                break;
            case 'signOut':
                signOutAction();
                break;
            case 'loginEmail':
                loginEmailAction(data)
                    .then(() => {
                        navigator.dispatch(link2Work);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            default:
                console.log(data);
                break;
        }
    }, []);
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
