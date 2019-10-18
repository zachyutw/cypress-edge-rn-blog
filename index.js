/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
// import { Navigation } from 'react-native-navigation';
import { AppRegistry, YellowBox } from 'react-native';
import Routes from './components/Pages/Routes';
// import App from './App';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import { name as appName } from './app.json';
import { combineReducers } from 'redux';

import { Provider as GlobalProvider } from './contexts/Global/GlobalContext';

YellowBox.ignoreWarnings([ 'RCTRootView cancelTouches' ]);
const global = (state = { abc: true }, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
const reducers = combineReducers({
    global: global
});
const store = createStore(reducers);

const AppShow = () => {
    return (
        <StoreProvider store={store}>
            <GlobalProvider>
                <Routes />
            </GlobalProvider>
        </StoreProvider>
    );
};

AppRegistry.registerComponent(appName, () => AppShow);
