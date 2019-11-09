import React, { useMemo } from 'react';
import { View } from 'react-native';
import InputPicker from './InputPicker';
import InputText from './InputText';
import InputSelect from './InputSelect';

const Input = (props) => {
    const renderInput = useMemo(
        () => {
            switch (props.type) {
                case 'picker':
                    return <InputPicker {...props} />;
                case 'select':
                    return <InputSelect {...props} />;
                default:
                    return <InputText {...props} />;
            }
        },
        [ props ]
    );

    return renderInput;
};
Input.Picker = InputPicker;
Input.Text = InputText;
export default Input;
