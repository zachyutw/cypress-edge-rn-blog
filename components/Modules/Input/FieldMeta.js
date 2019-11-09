import React from 'react';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
const FeildMeta = ({ meta = {} }) => {
    const { error: errorMsg, valid, touched } = meta;
    return (
        <View>
            {!valid &&
            touched && (
                <HelperText type='error' visible={!valid && touched}>
                    {errorMsg}
                </HelperText>
            )}
        </View>
    );
};
export default FeildMeta;
