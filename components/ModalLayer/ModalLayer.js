import React, { useMemo } from 'react';

import { View, TouchableOpacity } from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const StyledBackButton = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 45px;
`;
const BackButton = ({ onChange }) => {
    return (
        <TouchableOpacity onPress={onChange}>
            <StyledBackButton>
                <Ionicons size={30} name='ios-arrow-back' />
                <Text style={{ fontSize: 16, marginLeft: 3 }}>Back</Text>
            </StyledBackButton>
        </TouchableOpacity>
    );
};

const StyledModalContent = styled.View`
    position: relative;
    flex: 1;
    background-color: #fff;
    margin: 0;
    padding: 10px;
`;
const ModalLayer = ({ actived, toggleActived, children, propagateSwipe, style }) => {
    return (
        <Portal>
            <Modal
                style={{ margin: 0, ...style }}
                onSwipeComplete={toggleActived}
                animationInTiming={800}
                animationOutTiming={800}
                avoidKeyboard={true}
                swipeDirection='right'
                propagateSwipe={propagateSwipe}
                animationIn='bounceInRight'
                animationOut='bounceOutRight'
                isVisible={actived}>
                <StyledModalContent>
                    <BackButton onChange={toggleActived} />
                    {/* <Button style={{ marginTop: 30 }} onPress={toggleActived}>
                        Close
                    </Button> */}
                    {children}
                </StyledModalContent>
            </Modal>
        </Portal>
    );
};
const ModalLayerSidebar = ({ actived, toggleActived, children, propagateSwipe, style, direction = 'right' }) => {
    const config = useMemo(() => (direction === 'left' ? { swipeDirection: 'left', animationIn: 'bounceInLeft', animationOut: 'bounceOutLeft' } : { swipeDirection: 'right', animationIn: 'bounceInRight', animationOut: 'bounceOutRight' }), [ direction ]);

    return (
        <Portal>
            <Modal style={{ margin: 0, ...style }} {...config} onSwipeComplete={toggleActived} animationInTiming={800} animationOutTiming={800} avoidKeyboard={true} propagateSwipe={propagateSwipe} isVisible={actived}>
                <StyledModalContent>
                    <BackButton onChange={toggleActived} />
                    {/* <Button style={{ marginTop: 30 }} onPress={toggleActived}>
                        Close
                    </Button> */}
                    {children}
                </StyledModalContent>
            </Modal>
        </Portal>
    );
};

ModalLayer.Sidebar = ModalLayerSidebar;
export default ModalLayer;
