import React, { useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import AuthContext from '../../../contexts/Global/AuthContext';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import UserItem from '../../Auth/UserItem/UserItem';
import Link from '../../Routes/Link';
import { List } from 'react-native-paper';
import styled from 'styled-components';

const StyledLoginLinkText = styled(Text)`
     padding:10px;
     color:#FFF;
`;
const LoginLink = () => {
    return (
        <Link to='Auth'>
            <StyledLoginLinkText>Login</StyledLoginLinkText>
        </Link>
    );
};

const MenuScreen = ({ navigation }) => {
    const { state: { user } } = useContext(AuthContext);
    useEffect(
        () => {
            // console.log(navigation.state.params);
            // console.obj(user);
        },
        [ user ]
    );

    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <UserItem.Profile />
                <ScrollView>{user.email ? <AuthForm.SignOutButton /> : <AuthForm.LoginLink />}</ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default MenuScreen;
