import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';

import UserForm from '../../Auth/UserForm/UserForm';
// const Page = styled.View``;
const SectionTitle = styled(Title)`
    color: ${Colors.dark};
    margin-top: 8;
    font-size: 18;
    text-align:center;
    padding:5px;
    font-weight: 400;
`;

const ProfileSceen = (props) => {
    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <View>
                    <SectionTitle>Profile </SectionTitle>
                    <UserForm />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ProfileSceen;
