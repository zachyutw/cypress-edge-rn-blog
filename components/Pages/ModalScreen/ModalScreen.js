import React from 'react';
import { View, Button, Text } from 'react-native';
import WebViewer from '../../Modules/WebViewer/WebViewer';
import styled from 'styled-components/native';

const Browser = styled.View`
    height: 500;
    width: 100%;
    padding-top: 50;
    text-align: center;
    background-color: #eaeaea;
`;
const BrowserTitle = styled.Text`
    font-size: 30;
    text-align: center;
    font-family: 'Geeza Pro';
`;
const ModalScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <Browser>
                <BrowserTitle>This is a Webview!</BrowserTitle>
                <WebViewer uri='https://zachyutw.github.io/react-zachyutw/' />
            </Browser>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title='Dismiss' />
        </View>
    );
};
ModalScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <Button onPress={() => navigation.navigate('Home')} title='Home' color='#333' />,
    title: 'Home'
});
export default ModalScreen;
