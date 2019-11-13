import React, { useEffect, useContext } from 'react';
import { View, Button, Text, ImageBackground, Image, ScrollView } from 'react-native';
import WebViewer from '../../Modules/WebViewer/WebViewer';
import styled from 'styled-components';
import { Title, Subheading, Surface, Paragraph as ParagraphM, Chip } from 'react-native-paper';
import OpenDataContext, { withContext as withOpenData } from '../../../contexts/OpenData/OpenDataContext';
import OpenDataItem from '../../OpenData/OpenDataItem/OpenDataItem';
import Paragraph from '../../Modules/Paragraph/Paragraph';
import ImageBG from '../../Modules/ImageBG/ImageBG';
const Browser = styled(ScrollView)`
    
    width: 100%;
    /* text-align: center; */
    background-color: #eaeaea;
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
const ItemHeader = styled(View)`
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
const ItemContent = styled(Surface)`
    padding:20px;
    min-height:500px;
    /* flex:1; */
`;
const ItemMeta = styled(Surface)`
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
const StyledHeaderBG = styled(ImageBackground)`
    height: 200px;
    width:100%;
`;

const ODDetailScreen = (props) => {
    const { navigation } = props;
    const { itemState: { item = {}, condition }, onLoad } = useContext(OpenDataContext);
    const { photoUrl, title, description, content, ownership, yearofinstallation, artistAmout } = item;

    useEffect(() => {
        onLoad(navigation.state);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <Browser>
                <OpenDataItem.Header item={item} />
                <OpenDataItem.Meta item={item} />
                <OpenDataItem.Content item={item} />
                <Button onPress={() => navigation.goBack()} title='Dismiss' />
            </Browser>
        </View>
    );
};
ODDetailScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: <Button onPress={() => navigation.navigate('Home')} title='Home' color='#333' />,
    title: 'Home'
});
export default withOpenData(ODDetailScreen);
