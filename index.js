/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
// import { Navigation } from 'react-native-navigation';
import { AppRegistry, YellowBox } from 'react-native';
import Routes from './components/Routes/Routes';
// import App from './App';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import { name as appName } from './app.json';
import { combineReducers } from 'redux';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as GlobalProvider } from './contexts/Global/GlobalContext';
import { Provider as AuthProvider } from './contexts/Global/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
YellowBox.ignoreWarnings([ 'RCTRootView cancelTouches', 'Warning: componentWillMount is deprecated', 'Warning: componentWillReceiveProps is deprecated', 'Module RCTImageLoader requires', 'Warning: componentWillReceiveProps has been renamed' ]);
const global = (state = { abc: true }, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: true,
    ...DarkTheme,
    colors: {
        ...DefaultTheme.colors,
        ...DarkTheme.colors,
        accent: '#192f6a',
        primary: '#4c669f',
        blue: [ '#4c669f', '#3b5998', '#192f6a' ]
    }
};

const consoleObj = (data) => console.log(JSON.stringify(data, null, 2));
console.obj = consoleObj;

const reducers = combineReducers({
    global: global
});
const store = createStore(reducers);

const AppShow = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider
                theme={theme}
                settings={{
                    icon: (props) => <MaterialIcons {...props} />
                }}>
                <GlobalProvider>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </GlobalProvider>
            </PaperProvider>
        </StoreProvider>
    );
};

AppRegistry.registerComponent(appName, () => AppShow);
