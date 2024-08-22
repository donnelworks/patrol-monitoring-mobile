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