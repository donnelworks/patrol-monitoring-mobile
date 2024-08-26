import { StyleSheet, BackHandler } from 'react-native'
import React, {useEffect} from 'react'
import { Icon, Screen } from '@themes'
import { Button, Text } from '@components'
import { colors } from '@styles'

const Finish = ({navigation, route}) => {
    const status = route?.params?.status;

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onFinishHandler = () => {
        navigation.replace('home');
    }

    return (
        <Screen justifyContent="center">
            <Screen.Section alignItems="center" justifyContent="center" style={{flex: 1}}>
                <Icon.Location size={150} strokeColor={colors.primary} fillColor={colors.softGray} style={{marginBottom: 10}} />
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