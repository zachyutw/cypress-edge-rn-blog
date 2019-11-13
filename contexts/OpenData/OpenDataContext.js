import React, { createContext, useCallback, useReducer, useState, useMemo, useEffect, useContext } from 'react';
import { navigator } from '../../components/Routes/Routes';
import _ from 'lodash';
import { dispatchAction } from '../lib';
import localStorageSafe from '../../utls/localStorageSafe';
import { fetchDataset, fetchOpenDataRecord } from '../../API/opendata.api';
const Context = createContext({});

export let globalAuthState = {};
let initState = {
    actionType: 'init',
    items: [],
    params: {},
    condition: { error: { message: null } }
};
let initItemState = {
    actionType: 'init',
    item: {},
    condition: { error: { message: null } }
};
const Condition = ({ actionType, error }) => {
    if (/_start/gi.test(actionType)) {
        return { loading: true, error: {} };
    } else if (/_fail/gi.test(actionType)) {
        return { loading: false, error };
    } else {
        return { loading: false, error: {} };
    }
};

export const reducer = (state, action = {}) => {
    const { actionType } = action;
    const payload = action.payload || {};
    const condition = Condition(action);
    switch (actionType) {
        case 'init':
            return { ...state, ...payload };
        case 'fetchItems':
            // console.obj(payload.records);
            return { ...state, params: payload.params, items: payload.items, condition };
        case 'loadItems':
            // console.log(payload.params);
            return { ...state, params: payload.params, items: [ ...state.items, ...payload.items ], condition };
        case 'fetchItem':
            return { ...state, item: payload.item };
        default:
            // console.log('reducer ', action);
            return { ...state, condition };
    }
};

export const Provider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const [ itemState, dispatchItem ] = useReducer(reducer, initItemState);
    const fetchItemsAction = useCallback(dispatchAction(dispatch, fetchDataset, 'fetchItems'), []);
    const loadItemsAction = useCallback(dispatchAction(dispatch, fetchDataset, 'loadItems'), []);
    const fetchOpenDataRecordAction = useCallback(dispatchAction(dispatchItem, fetchOpenDataRecord, 'fetchItem'), []);
    useEffect(
        () => {
            // console.obj(itemState);
        },
        [ itemState ]
    );

    const _onLoad = useCallback((action = {}) => {
        const { routeName, actionType, params = {} } = action;
        switch (routeName) {
            case 'ODDatasetList':
                fetchItemsAction({});
                break;
            case 'ODDetail':
                fetchOpenDataRecordAction(params);
                break;
            default:
                // console.log(action);
                break;
        }
        // console.log(routeName);
        switch (actionType) {
            default:
                break;
        }
    }, []);
    const _onChange = useCallback((payload = {}) => {
        const { actionType, params } = payload;
        switch (actionType) {
            case 'loadItems':
                console.obj(params);
                loadItemsAction({ params });
                break;
            default:
                // console.log(data);
                break;
        }
    }, []);

    // console.obj(state);
    return <Context.Provider value={{ state, itemState, onChange: _onChange, onLoad: _onLoad }}>{props.children}</Context.Provider>;
};

export const withContext = (Componet) => (props) => {
    return (
        <Provider>
            <Componet {...props} />
        </Provider>
    );
};

export default Context;
