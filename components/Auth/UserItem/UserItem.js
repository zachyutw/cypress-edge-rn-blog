import React, { useCallback, useContext, useEffect } from 'react';
import { Text, Button, Avatar } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AuthContext from '../../../contexts/Global/AuthContext';
import { withNavigation } from 'react-navigation';
import Link from '../../Routes/Link';
const StyledUserItemProfile = styled.View``;
const StyledEditProfileLink = styled.Button`color: #ccc;`;

const UserItemProfile = withNavigation(({ navigation }) => {
    return (
        <StyledUserItemProfile>
            <UserItem />
            <Link to='Profile'>
                <Text>Edit Profile</Text>
            </Link>
        </StyledUserItemProfile>
    );
});
const s = StyleSheet.create({
    avatar: {
        borderColor: '#FFF',
        borderWidth: 2,
        borderStyle: 'solid'
    }
});
const StyledUserItem = styled.View`
    flex-direction: row;
    align-items: center;
`;
const StyledName = styled.Text`padding: 3px 5px;`;
const UserItem = () => {
    const { state: { user: { photoURL = 'https://i.imgur.com/7jjdTEW.jpg', displayName } } } = useContext(AuthContext);
    const avatarSize = 40;

    return (
        <StyledUserItem>
            {photoURL ? <Avatar.Image style={s.avatar} size={avatarSize} source={{ uri: photoURL }} /> : <Avatar.Text style={s.avatar} size={avatarSize} label='XD' />}
            <StyledName>{displayName ? displayName : 'Display Default'}</StyledName>
        </StyledUserItem>
    );
};
UserItem.Profile = UserItemProfile;
export default UserItem;
