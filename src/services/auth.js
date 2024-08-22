import { request } from "@helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (data) => {
    try {
        const res = await request('auth/login', data);
        await AsyncStorage.setItem('userId', res.data.id);
        await AsyncStorage.setItem('token', res.data.token);
        return res;
    } catch (error) {
        throw error;
    }
}

export const sessionCheck = async () => {
    try {
        const id = await AsyncStorage.getItem('userId');
        const res = await request('auth/session_check', {id});
        return res;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    await AsyncStorage.clear();
}