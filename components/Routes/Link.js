import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
const Link = withNavigation(({ navigation, children, to, params }) => {
    const _onPress = useCallback(() => navigation.navigate({ routeName: to, params }), [ to, params ]);
    return <TouchableOpacity onPress={_onPress}>{children}</TouchableOpacity>;
});
const LinkGoBack = withNavigation(({ navigation, children, to }) => {
    const _onPress = useCallback(() => (to ? navigation.goBack(to) : navigation.goBack()), [ to ]);
    return <TouchableOpacity onPress={_onPress}>{children}</TouchableOpacity>;
});
Link.GoBack = LinkGoBack;
export default Link;
