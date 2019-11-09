import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
const InputSelect = ({ options = [], disabled, label, autoFocus, itemStyle, testID, style = {}, value, onChange, onBlur, onFocus }) => {
    return (
        <View>
            <Dropdown
                labelTextStyle={{ paddingLeft: 10 }}
                data={options}
                value={value}
                disabled={disabled}
                label={label}
                onChangeText={onChange}
                style={{ paddingLeft: 10, paddingRight: 10, ...style }}
                onBlur={onBlur}
                onFocus={onFocus}
                itemTextStyle={itemStyle}
            />
        </View>
    );
};

export default InputSelect;
