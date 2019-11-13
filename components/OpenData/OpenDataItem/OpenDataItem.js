import React, { useEffect, useContext } from 'react';
import { Card, Title, Paragraph, Chip, Subheading, Surface } from 'react-native-paper';
import { View, Linking, TouchableOpacity, Platform } from 'react-native';
import Link from '../../Routes/Link';
import styled from 'styled-components';
import ImageBG from '../../Modules/ImageBG/ImageBG';
import HideParagraph from '../../Modules/Paragraph/Paragraph';
const StyledOpenDataCard = styled(Card)`
    margin:10px 0;
`;
const BrowserTitle = styled(Title)`
    font-size: 30;
    text-align: left;
    padding:30px;
    font-family: 'Geeza Pro';
    color:#FFF;
  
`;
const HeaderSubTitle = styled(Subheading)`
     padding: 5px 30px;
     z-index:1;
     font-weight:900;
`;
const StyeldItemHeader = styled(View)`
    position: relative;

    /* padding:30px; */
    /* display: flex;
    
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-width:2px;
    border-color:red;
    height:250px;
    width:100%; */
`;
const StyledItemContent = styled(Surface)`
    padding:20px;
    min-height:500px;
    /* flex:1; */
`;
const StyledItemMeta = styled(Surface)`
    padding:20px;
    /* flex:1; */
    margin:10px 10px;
    margin-top:-5px;
    border-radius:8px;
    
`;
const MetaChip = styled(Chip)`
    margin:5px;
    width:auto;

`;

openGps = (coordinates = [], label = '') => {
    const [ lng, lat ] = coordinates;
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const location = `${lat},${lng}?q=${label.replace(/ |, /g, '+')}+Vancouver`;
    var url = scheme + location;
    Linking.openURL(url);
};
const ItemContet = ({ item }) => {
    const { photoUrl, title, description, content, ownership, yearofinstallation, artistAmout } = item;
    return (
        <StyledItemContent>
            <Paragraph>{content}</Paragraph>
        </StyledItemContent>
    );
};
const ItemMeta = ({ item }) => {
    const { photoUrl, title, description, content, geom = {}, address, ownership, yearofinstallation, artistAmout } = item;
    const { coordinates } = geom;

    return (
        <StyledItemMeta>
            <MetaChip mode='outlined'>{ownership}</MetaChip>
            <MetaChip mode='outlined'>{yearofinstallation}</MetaChip>
            <MetaChip mode='outlined' style={{ width: 100, textAlign: 'center' }}>{`Artists:${artistAmout}`}</MetaChip>
            <TouchableOpacity
                onPressOut={() => {
                    openGps(coordinates, address);
                }}>
                <MetaChip mode='outlined'>{address}</MetaChip>
            </TouchableOpacity>
        </StyledItemMeta>
    );
};
const ItemHeader = ({ item }) => {
    const { photoUrl, title, description, content, ownership, yearofinstallation, artistAmout } = item;
    return (
        <StyeldItemHeader>
            <ImageBG source={{ uri: photoUrl }} height={250} />
            <BrowserTitle>{title}</BrowserTitle>
            <HeaderSubTitle
                style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                }}>
                <HideParagraph text={description} maxLength={200} />
            </HeaderSubTitle>
        </StyeldItemHeader>
    );
};

const OpenDataItem = ({ item = {} }) => {
    const { id, title, description, photoUrl } = item;
    return (
        <StyledOpenDataCard key={id}>
            <Card.Cover source={{ uri: photoUrl }} />
            <Card.Content>
                <Link to='ODDetail' params={{ id }}>
                    <Title>{title}</Title>
                </Link>
                <Paragraph>{description}</Paragraph>
            </Card.Content>
        </StyledOpenDataCard>
    );
};
OpenDataItem.Header = ItemHeader;
OpenDataItem.Content = ItemContet;
OpenDataItem.Meta = ItemMeta;
export default OpenDataItem;
