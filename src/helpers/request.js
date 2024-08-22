import AsyncStorage from "@react-native-async-storage/async-storage";

const request = async (ROUTE, REQUEST_PAYLOAD) => {
    // const BASE_URL = 'https://sijaga.siskasoftware.com/api/';
    const BASE_URL = 'https://dev.siskasoftware.com/api/';
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
    
    const res = await fetch(BASE_URL + ROUTE, requestObject);
    
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