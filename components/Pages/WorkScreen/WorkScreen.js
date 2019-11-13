/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useContext, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, RefreshControl } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import OpenDataContext, { withContext as withOpenData } from '../../../contexts/OpenData/OpenDataContext';
import { Card, Title, Surface, ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components';
import OpenDataItem from '../../OpenData/OpenDataItem/OpenDataItem';
import { debounce } from 'lodash';
const StyledOpenDataList = styled(View)`
    padding: 0 10px;
`;
const StyledLoadingView = styled(View)`
    height:  ${({ loading }) => (loading ? '500' : '0')} ;
    flex:1;
    justify-content:center;
    
`;
const LoadingView = ({ loading }) => {
    return (
        <StyledLoadingView loading={loading}>
            <ActivityIndicator animating={loading} />
        </StyledLoadingView>
    );
};
const StyledHeader = styled(Surface)`
    padding:14px;
`;
const StyledTitle = styled(Title)`
    padding:14px;
`;
const OpenDataListHeader = () => {
    return (
        <StyledHeader>
            <StyledTitle>Vancouver Public Arts</StyledTitle>
        </StyledHeader>
    );
};
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
const ODDatasetListScreen = ({ navigation, screenProps: { theme } }) => {
    const { state: { items = [], condition, params }, onLoad, onChange } = useContext(OpenDataContext);
    useEffect(() => {
        onLoad(navigation.state);
    }, []);
    const _onLoadMore = ({ nativeEvent }) => {
        // event.persist();
        console.log('loadmore');
        if (isCloseToBottom(nativeEvent)) {
            onChange({ actionType: 'loadItems', params: { ...params, start: params.start + 1 } });
        }
        // console.log(nativeEvent);
    };
    // debounce(_onLoadMore, 1000)
    const _onRefresh = useCallback(
        () => {
            console.log('refresh');
            onLoad(navigation.state);
        },
        [ navigation ]
    );
    // onMomentumScrollBegin = { _onLoadMore }
    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <ScrollView scrollEventThrottle={16} refreshControl={<RefreshControl refreshing={condition.loading} onRefresh={_onRefresh} />} onMomentumScrollEnd={_onLoadMore} contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                    <OpenDataListHeader />

                    <View style={styles.body}>
                        <StyledOpenDataList>
                            {items.length === 0 && <LoadingView loading={condition.loading} />}
                            {items.map((item, index) => <OpenDataItem key={index} item={item} />)}
                        </StyledOpenDataList>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    }
});

export default withOpenData(ODDatasetListScreen);
