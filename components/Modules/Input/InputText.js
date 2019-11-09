import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FieldMeta from './FieldMeta';
import styled from 'styled-components';
const StyledIcon = styled(IconButton)`
    position: absolute;
    top:0;
    right:5px;
    z-index:2;
    height:100%;
    width:50px;
`;

const InputText = ({ meta = {}, label, placehoder, onChange, value, onFocus, onBlur, secureTextEntry: propSecureEntry, style, mode }) => {
    const { error: errorMsg, valid, touched } = meta;
    const [ secureTextEntry, setSecureTextEntry ] = useState(propSecureEntry);
    const _onToggleSecureTextEntry = useCallback(() => setSecureTextEntry((value) => !value), []);
    return (
        <View>
            <TextInput mode={mode} error={!valid && touched} label={label} secureTextEntry={secureTextEntry} style={style} onFocus={onFocus} onBlur={onBlur} placehoder={placehoder} value={value} onChangeText={onChange} />
            {secureTextEntry !== undefined && <StyledIcon color={Colors.blue300} size={25} icon={() => <Icon size={25} name={secureTextEntry ? 'ios-eye' : 'ios-eye-off'} />} onPress={_onToggleSecureTextEntry} />}

            <FieldMeta meta={meta} />
        </View>
    );
};

export default InputText;
