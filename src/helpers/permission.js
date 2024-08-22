import {PermissionsAndroid} from 'react-native';

export const fineLocationPermission = async () => {
    try {
        const granted = PermissionsAndroid.create(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    } catch (error) {
        
    }
}