import {PermissionsAndroid} from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

export const fineLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            SheetManager?.show('permission-setting-sheet', {payload: {data: "lokasi"}})
            return false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const cameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            SheetManager?.show('permission-setting-sheet', {payload: {data: "camera"}})
            return false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}