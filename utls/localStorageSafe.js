import { AsyncStorage } from 'react-native';
const setItem = async (keyName, data) => {
    try {
        if (typeof data === 'object') {
            AsyncStorage.setItem(keyName, JSON.stringify(data));
        } else {
            AsyncStorage.setItem(keyName, +'' + data);
        }
    } catch (err) {
        AsyncStorage.setItem(keyName, null);
    }
};
const getItem = async (keyName) => {
    let dataStr = await AsyncStorage.getItem(keyName);
    try {
        return JSON.parse(dataStr);
    } catch (err) {
        return dataStr;
    }
};

const localStorageSafe = { ...AsyncStorage, setItem, getItem };
export default localStorageSafe;
