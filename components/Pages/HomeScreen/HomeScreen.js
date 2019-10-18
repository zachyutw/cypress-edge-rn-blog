/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';

const SectionTitle = styled.Text`
    color: ${Colors.dark};
    margin-top: 8;
    font-size: 18;
    font-weight: 400;
`;
const HomeScreen = (props) => {
    const { state } = useContext(GlobalContext);

    return (
        <View>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View>
                        <Button title='Go to Work' onPress={() => props.navigation.navigate('Work')} />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <SectionTitle>HomeScreen</SectionTitle>
                            <Text style={styles.sectionDescription}>
                                Edit <Text style={styles.highlight}>App.js</Text> to change this screen and then come back to see your edits.
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>See Your Changes123</Text>
                            <Text style={styles.sectionDescription}>
                                <ReloadInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Debug</Text>
                            <Text style={styles.sectionDescription}>
                                <DebugInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Learn More</Text>
                            <Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
                        </View>
                        <LearnMoreLinks />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
HomeScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <Button onPress={() => navigation.navigate('Modal')} title='Info' color='#333' />,
    title: 'Home'
});

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

export default HomeScreen;
