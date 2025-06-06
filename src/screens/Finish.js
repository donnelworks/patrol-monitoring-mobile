import { StyleSheet, BackHandler } from 'react-native'
import React, {useEffect} from 'react'
import { Icon, Screen } from '@themes'
import { Button, Text } from '@components'
import LottieView from 'lottie-react-native'

const Finish = ({navigation, route}) => {
    const status = route?.params?.status;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
        return () => backHandler.remove();
    }, []);

    const onFinishHandler = () => {
        navigation.navigate('home');
    }

    return (
        <Screen justifyContent="center">
            <Screen.Section alignItems="center" justifyContent="center" style={{flex: 1}}>
                <LottieView source={require('../assets/lotties/success.json')} autoPlay loop={false} style={{width: 200, height: 200}}/>
                <Text size={16} type="OpenSansSemiBold">Berhasil {status} Posisi</Text>
                <Text>Silahkan melanjutkan aktifitas Anda</Text>
            </Screen.Section>
            <Screen.Section alignItems="center" padding='15 0 20 0'>
                <Button title="Lihat Daftar Kegiatan" onPress={onFinishHandler} />
            </Screen.Section>
        </Screen>
    )
}

export default Finish

const styles = StyleSheet.create({})