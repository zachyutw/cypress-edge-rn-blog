import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { TouchableRipple } from 'react-native-paper';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
const Paragraph = ({ text = '', maxLength = 50 }) => {
    const [ isMore, setIsMore ] = useState(text.length > maxLength);
    const _onClick = useCallback(() => {
        console.log('click');
        setIsMore((value) => !value);
    }, []);
    useEffect(
        () => {
            setIsMore(text.length > maxLength);
        },
        [ text, maxLength ]
    );
    return (
        <Fragment>
            {text.length > maxLength && isMore ? text.slice(0, maxLength) : text}
            {isMore && (
                <TouchableWithoutFeedback onLongPress={_onClick} rippleColor='rgba(0, 0, 0, .32)'>
                    <Text style={{ zIndex: 3 }}>... </Text>
                </TouchableWithoutFeedback>
            )}
        </Fragment>
    );
};
export default Paragraph;
