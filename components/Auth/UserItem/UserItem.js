import React, { useCallback, useContext, useEffect } from 'react';
import { Text, Button, Avatar, withTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import styled from 'styled-components/native';
import styled from 'styled-components';
import AuthContext from '../../../contexts/Global/AuthContext';
import { withNavigation } from 'react-navigation';
import Link from '../../Routes/Link';

const StyledUserItemProfile = styled(View)`
    padding: 20px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color:${({ theme }) => theme.colors.blue[2]};
    border-bottom-color: ${({ theme }) => theme.colors.text};
    border-bottom-width:1px;
`;
const StyledEditProfileLink = styled(Button)`color: #ccc;`;

const UserItemProfile = withTheme(
    withNavigation(({ theme }) => {
        return (
            <StyledUserItemProfile theme={theme}>
                <UserItem />
                <Link to='Profile'>
                    <Text style={{ position: 'absolute', bottom: -10, right: 0 }}>Edit Profile</Text>
                </Link>
            </StyledUserItemProfile>
        );
    })
);
const s = StyleSheet.create({
    avatar: {
        borderColor: '#FFF',
        borderWidth: 2,
        borderStyle: 'solid'
    }
});
const StyledUserItem = styled(View)`
    flex-direction: row;
    align-items: center;
`;
const StyledName = styled(Text)`
    padding: 3px 5px;
    color: #fff;
`;

const StyledAvatarImage = styled(Avatar.Image)`
    border-color:#FFF;
    border-width:1px;
    border-style:solid;
`;
const StyledAvatarText = styled(Avatar.Text)`
  border-color:#FFF;
    border-width:2px;
    border-style:solid;
`;
const UserItem = () => {
    const { state: { user: { photoURL = 'https://i.imgur.com/7jjdTEW.jpg', displayName = '' } } } = useContext(AuthContext);
    const avatarSize = 40;

    return (
        <StyledUserItem>
            {photoURL ? <StyledAvatarImage size={avatarSize} source={{ uri: photoURL }} /> : <StyledAvatarText size={avatarSize} label='XD' />}
            <StyledName>{displayName ? displayName : 'Display Default'}</StyledName>
        </StyledUserItem>
    );
};
UserItem.Profile = UserItemProfile;
export default UserItem;
