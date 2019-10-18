import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

const LoadView = styled.View`
    height: 100%;
    width: 100%;
`;

const WebViewer = ({ uri }) => {
    const [ state, setState ] = useState({});
    const params = 'platform=' + Platform.OS;
    const injectedJS = `if (!window.location.search) {
      var link = document.getElementById('progress-bar');
      link.href = './site/index.html?${params}';
      link.click();
    }`;
    console.log(state);
    return (
        <WebView
            cacheEnabled={true}
            cacheMode='LOAD_DEFAULT'
            renderError={() => {
                console.log('renderError');
                return (
                    <LoadView>
                        <Text>renderError</Text>
                    </LoadView>
                );
            }}
            onNavigationStateChange={(navState) => {
                const { canGoForward, canGoBack, title } = navState;
                setState({ canGoForward, canGoBack, title });
            }}
            renderLoading={() => {
                return (
                    <LoadView>
                        <Text>自定义Loading...</Text>
                    </LoadView>
                );
            }}
            startInLoadingState={true}
            automaticallyAdjustContentInsets={false}
            injectedJS={injectedJS}
            allowFileAccess={true}
            javaScriptEnabled={true}
            originWhitelist={[ '*' ]}
            source={{ uri }}
        />
    );
};

export default WebViewer;
