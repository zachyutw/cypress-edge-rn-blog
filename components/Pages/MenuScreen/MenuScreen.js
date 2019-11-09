import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import UserItem from '../../Auth/UserItem/UserItem';
const MenuScreen = ({ navigation }) => {
    useEffect(() => {
        // console.log(navigation.state.params);
    }, []);

    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <UserItem.Profile />
                <AuthForm.SignOutButton />
            </SafeAreaView>
        </View>
    );
};

export default MenuScreen;
