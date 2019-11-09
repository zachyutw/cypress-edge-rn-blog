import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../contexts/Global/AuthContext';
import { Button, View, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Text, Title, Subheading } from 'react-native-paper';
import Link from '../../Routes/Link';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import LinearGradient from 'react-native-linear-gradient';
const Page = styled(LinearGradient)`
    flex-direction: column;
    align-items: center;
    padding-top: 10%;
    width: 100%;
    height:100%;
    /* display: flex;
    align-items: center; */
`;

const AuthScreen = (props) => {
    const { onLoad } = useContext(AuthContext);
    const { navigation } = props;
    useEffect(() => {
        onLoad(navigation.state);
    }, []);
    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <Page start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[ '#4c669f', '#3b5998', '#192f6a' ]}>
                <Title>Welcome to CypressEdge</Title>
                <Subheading style={{ marginBottom: 200 }}>Let's Start</Subheading>

                <AuthForm.Login />
            </Page>
        </View>
    );
};
// AuthScreen.navigationOptions = ({ navigation }) => {
//     console.obj(navigation);
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//         tabBarVisible = false;
//     }

//     return {
//         headerLeft: <Button onPress={() => navigation.goBack()} title='Back' color='#333' />,
//         title: 'Auth',
//         tabBarVisible: false,
//         mode: 'card',
//         tabBarVisible
//     };
// };
export default AuthScreen;
