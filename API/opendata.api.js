import axios from 'axios';
import sleep from 'sleep-promise';

const openDataVancouverRecordSearch = axios.create({ baseURL: 'https://opendata.vancouver.ca/api/records/1.0/search/' });
const openDataVancouverDatasets = axios.create({ baseURL: 'https://opendata.vancouver.ca/api/datasets/1.0' });
const OPEN_DATA_IMAGE = 'https://covapp.vancouver.ca/PublicArtRegistry/ImageDisplay.';
const PlACE_HOLDER_IMAGE = 'https://lorempixel.com/640/480/city/Default-Text';
const formatODRecord = ({ datasetid, recordid, fields = {}, record_timestamp }) => {
    const {
        type,
        primarymaterial,
        locationonsite,
        siteaddress,
        geo_local_area,
        artistprojectstatement,
        geom,
        neighbourhood,
        artists,
        ownership,
        photocredits,
        registryid,
        url,
        sitename,

        photourl = {},
        yearofinstallation,
        descriptionofwork,
        status
    } = fields;
    const { format, mimetype, filename, width, height, id, thumbnail } = photourl;
    return {
        category: datasetid,
        id: recordid,
        updatedAt: record_timestamp,
        photoUrl: format ? OPEN_DATA_IMAGE + format : PlACE_HOLDER_IMAGE,
        artistAmout: artists,
        ownership,
        webUrl: url,
        title: sitename,
        yearofinstallation,
        description: descriptionofwork,
        status,
        geom,
        tags: `#${type}#${primarymaterial}`,
        address: `${siteaddress}, ${geo_local_area}`,
        content: artistprojectstatement
    };
};
export const fetchOpenDataRecord = async ({ id, category = 'public-art' }) => {
    return await openDataVancouverDatasets.get(`/${category}/records/${id}`, {}).then((res) => ({ item: formatODRecord(res.data) }));
};
export const fetchDataset = async ({ params = {} }) => {
    const facets = [ 'status', 'sitename', 'siteaddress', 'primarymaterial', 'ownership', 'neighbourhood', 'artists', 'photocredits' ];
    return await openDataVancouverRecordSearch
        .get('?' + facets.join('&'), { params: { dataset: 'public-art', start: 0, rows: 10, ...params } })
        .then((res) => ({ ...res.data, params: { start: 0, rows: 10, ...params }, items: res.data.records.map((data) => formatODRecord(data)) }));
};
