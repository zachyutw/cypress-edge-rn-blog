import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../contexts/Global/GlobalContext';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import HomeScreen from '../Pages/HomeScreen/HomeScreen';
import WorkScreen from '../Pages/WorkScreen/WorkScreen';
import ModalScreen from '../Pages/ModalScreen/ModalScreen';

import AuthLoginScreen from '../Pages/AuthLoginSceen/AuthLoginSceen';
import MenuScreen from '../Pages/MenuScreen/MenuScreen';
import ProfileSceen from '../Pages/ProfileSceen/ProfileSceen';
import AuthSignUpScreen from '../Pages/AuthSignUpScreen/AuthSignUpScreen';
import LinearGradient from 'react-native-linear-gradient';
import ODDetailScreen from '../Pages/ODDetailScreen/ODDetailScreen';
const MaterialBottomTab = ({ tintColor, focused, iconName }) => (
    <View>
        <Ionicons style={[ { color: tintColor } ]} size={focused ? 22 : 25} name={iconName} />
    </View>
);

const LinearHeaderBackground = ({ colors }) => {
    return <LinearGradient colors={colors} style={{ flex: 1 }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} />;
};

const AuthStack = createStackNavigator(
    {
        AuthLogin: {
            screen: AuthLoginScreen,
            navigationOptions: ({ screenProps: { theme } }) => {
                return {
                    headerBackground: <LinearHeaderBackground colors={theme.colors.blue} />,
                    title: 'Login',
                    mode: 'modal',
                    headerTitleStyle: { color: theme.colors.text }
                };
            }
        },
        AuthSignUp: {
            screen: AuthSignUpScreen,
            navigationOptions: ({ screenProps: { theme } }) => {
                return {
                    headerBackTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                    headerBackground: <LinearHeaderBackground colors={theme.colors.blue} />,
                    title: 'Sign Up',
                    mode: 'modal',
                    headerTitleStyle: { color: theme.colors.text }
                };
            }
        }
    },
    { initialRouteName: 'AuthLogin', mode: 'card', headerMode: 'float', headerTransitionPreset: 'fade-in-place' }
);
AuthStack.navigationOptions = (props) => {
    // console.obj(props);
    return {
        headerStyle: { backgroundColor: '#3b5998' },
        headerTitleStyle: { color: '#FFF' }
    };
};
const MenuStack = createStackNavigator(
    {
        Menu: { screen: MenuScreen },
        Profile: { screen: ProfileSceen }
    },
    {
        initialRouteName: 'Menu'
    }
);

const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Modal: { screen: ModalScreen },
        AuthLogin: { screen: AuthLoginScreen }
    },
    {
        initialRouteName: 'Home'
    }
);
HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        header: null,
        tabBarVisible
    };
};

const ODDatasetListStack = createStackNavigator(
    {
        ODDatasetList: { screen: WorkScreen },
        ODDetail: { screen: ODDetailScreen }
    },
    {
        initialRouteName: 'ODDatasetList',
        mode: 'modal'
    }
);

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: (props) => <MaterialBottomTab {...props} iconName='ios-home' />
            }
        },
        ODDatasetList: {
            screen: ODDatasetListStack,
            navigationOptions: {
                tabBarLabel: 'VanArt',
                tabBarIcon: (props) => <MaterialBottomTab {...props} iconName='ios-person' />,
                activeColor: '#f0edf6',
                inactiveColor: '#578CD1',
                barStyle: { backgroundColor: '#252B39' }
            }
        },
        MenuScreen: {
            screen: MenuStack,
            navigationOptions: {
                tabBarLabel: 'Menu',
                tabBarIcon: (props) => <MaterialBottomTab {...props} iconName='ios-menu' />,
                activeColor: '#f0edf6',
                inactiveColor: '#578CD1',
                barStyle: { backgroundColor: '#252B39' }
            }
        }
    },
    {
        // shifting: true,
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#578CD1',
        barStyle: { backgroundColor: '#252B39' },

        defaultNavigationOptions: {
            header: null
        }
    }
);
const AppNavigator = createSwitchNavigator({
    Auth: AuthStack,
    Home: TabNavigator
});

const AppContainer = createAppContainer(AppNavigator);
export let navigator;
function Routes ({ theme }){
    return (
        <AppContainer
            ref={(nav) => {
                navigator = nav;
            }}
            theme={theme.dark ? 'dark' : 'light'}
            screenProps={{ theme }}
        />
    );
}
export const pushTo = (routeName, params, action) => {
    return navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
            action
        })
    );
};
export default withTheme(Routes);
