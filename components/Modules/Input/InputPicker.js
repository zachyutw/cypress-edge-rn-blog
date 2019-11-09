import React, { useState, useCallback } from 'react';
import { View, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isEmpty } from 'lodash';
const StyledField = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;
const StyledFieldValue = styled.View`
    padding-top: ${({ hasValue }) => (hasValue ? 10 : 15)};
    padding-bottom: ${({ hasValue }) => (hasValue ? 10 : 15)};
`;
const StyledText = styled.Text`
    padding-left: 10px;
    padding-top: 5px;
    font-size: 16px;
`;
const StyleLabel = styled.Text`
    padding-left: 10px;
    font-size: 12px;
`;

const s = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 16
    },
    label: {
        padding: 10
    }
});

const PickerFieldValue = withTheme(({ theme, value, label, actived }) => {
    return (
        <StyledFieldValue hasValue={!isEmpty(value)}>
            {!isEmpty(value) && (
                <StyleLabel theme={theme} style={{ color: actived ? theme.colors.primary : theme.colors.placeholder }}>
                    {value && label}
                </StyleLabel>
            )}
            <StyledText theme={theme} style={{ color: value ? theme.colors.word : theme.colors.placeholder }}>
                {value ? value : label}
            </StyledText>
        </StyledFieldValue>
    );
});

const InputPicker = ({ options = [], disabled, mode, label, itemStyle, testID, style, value, onChange, theme }) => {
    const [ actived, setActived ] = useState(false);
    const toggleActived = useCallback(() => setActived((value) => !value), []);
    console.obj(theme);
    return (
        <View>
            <StyledField theme={theme} backgroundColor='red'>
                <PickerFieldValue value={value} label={label} actived={actived} />
                <TouchableOpacity onPress={toggleActived}>
                    <Ionicons size={30} style={{ paddingRight: 10 }} name='ios-arrow-forward' />
                </TouchableOpacity>
            </StyledField>
            {actived && (
                <Picker onValueChange={onChange} selectedValue={value} style={style} testID={testID} enabled={!disabled} mode={mode} prompt={label} itemStyle={itemStyle}>
                    {options.map(({ label, value }, index) => <Picker.Item key={index} label={label} value={value} />)}
                </Picker>
            )}
        </View>
    );
};

export default withTheme(InputPicker);
