import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./path";

const request = async (ROUTE, REQUEST_PAYLOAD) => {
    const END_POINT = endpoint;
    const AUTH_TOKEN = await AsyncStorage.getItem('token');

    let bodyData = JSON.stringify(REQUEST_PAYLOAD);
    let requestObject = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyData,
        timeout: 60000
    }

    if (AUTH_TOKEN) {
        requestObject.headers.Authorization = AUTH_TOKEN;
    }
    
    const res = await fetch(END_POINT + ROUTE, requestObject);
    
    let resData = await res.text();
    let responseJson = JSON.parse(resData);

    if (!responseJson.success) {
        throw {
            statusMessage: responseJson.status_message,
            data: responseJson.data
        }
    }
    
    return responseJson;
}

export default request;