import React from 'react';
import { Image } from 'react-native';
import { Facebook } from 'react-content-loader';
const ImageBG = ({ source, height = '100%' }) => {
    return source ? <Image source={source} style={{ resizeMode: 'cover', height, width: '100%', position: 'absolute', zIndex: -1 }} /> : <Facebook />;
};

export default ImageBG;
