import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../contexts/Global/AuthContext';
import { Button, View, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Text, Title, Subheading } from 'react-native-paper';
import Link from '../../Routes/Link';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import LinearGradient from 'react-native-linear-gradient';

const Page = styled(LinearGradient)`
    flex: 1;
    align-items: center;
    padding-top: 10%;
    width: 100%;
    height:100%;
    position: relative;
    /* display: flex;
    align-items: center; */
`;
const StyledSkipLink = styled(Text)`
    flex:1;
    font-size:20px;
    align-items:flex-end;
    font-weight:900;
    justify-content:flex-start;
    padding:30px 10px;
    color: ${({ theme }) => theme.colors.text};
`;
const statusCodes = {};
const Screen = ({ navigation, screenProps: { theme } }) => {
    const { onLoad } = useContext(AuthContext);
    useEffect(() => {
        onLoad(navigation.state);
    }, []);
    // console.obj(props);

    return (
        <Page start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={theme.colors.blue}>
            <StatusBar barStyle='dark-content' />

            <Title>Welcome to CypressEdge</Title>
            <Subheading style={{ marginBottom: 200 }}>Let's Start</Subheading>
            <AuthForm.SignGoogleButton />
            <AuthForm.Login />
            <Link to='Home'>
                <StyledSkipLink theme={theme}>Skip...</StyledSkipLink>
            </Link>
        </Page>
    );
};

export default Screen;
