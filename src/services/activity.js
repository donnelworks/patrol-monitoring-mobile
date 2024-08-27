import { request } from "@helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getActivity = async () => {
    try {
        const id = await AsyncStorage.getItem('userId');
        const res = await request('activity/get_activity', {id});
        return res;
    } catch (error) {
        throw error;
    }
}

export const activityStatusCheck = async (data) => {
    try {
        const id = await AsyncStorage.getItem('userId');

        let requestData = {
            user_id: id,
            number_activity: data?.number,
            status_checkin: data?.status_checkin,
            team_id: data?.team_id,
        }

        const res = await request('activity/activity_status_check', requestData);
        return res;
    } catch (error) {
        throw error;
    }
}

export const positionCheck = async (data) => {
    try {
        const id = await AsyncStorage.getItem('userId');

        let requestData = {
            user_id: id,
            status_checkin: data?.status_checkin,
            latitude: data?.latitude,
            longitude: data?.longitude,
            member_latitude: data?.memberLatitude,
            member_longitude: data?.memberLongitude,
        }

        const res = await request('activity/position_check', requestData);
        return res;
    } catch (error) {
        throw error;
    }
}

export const saveActivity = async (data) => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        const userName = await AsyncStorage.getItem('userName');

        let requestData = {
            user_id: userId,
            member_name: userName,
            number_activity: data?.number,
            member_id: null,
            unit_short_name: data?.unit_short_name,
            team_name: data?.team_name,
            date: data?.date,
            activity_id: data?.id,
            region_id: data?.region_id,
            latitude: data?.latitude,
            longitude: data?.longitude,
            member_latitude: data?.memberLatitude,
            member_longitude: data?.memberLongitude,
            media: data?.media,
            notes: data?.notes,
            status_checkin: data?.status_checkin,
        }

        console.log(JSON.stringify(requestData, null, 2));
        return;
        

        const res = await request('activity/save_activity', requestData);
        return res;
    } catch (error) {
        throw error;
    }
}