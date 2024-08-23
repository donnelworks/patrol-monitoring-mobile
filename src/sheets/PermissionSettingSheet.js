import {StyleSheet, View, Linking} from 'react-native';
import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { Button, Text } from '@components';
import { Gap } from '@themes';

const PermissionSettingSheet = (props) => {

  const permissionName = props.payload.data;

  return (
    <ActionSheet
      snapPoints={[100]}
      initialSnapIndex={0}
      gestureEnabled
      springOffset={90}
      closeAnimationConfig={{
        stiffness: 95.8,
        damping: 14.7,
        mass: 1,
      }}
      containerStyle={{
        paddingTop: 20,
        height: '30%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
        <View style={styles.content}>
            <Text size={18} type="OpenSansBold">Izin {permissionName} tidak diizinkan</Text>
            <Text size={12}>Silahkan ubah pengaturan izin {permissionName}</Text>
            <Gap height={15} />
            <Button title="Buka Pengaturan Aplikasi" onPress={() => Linking.openSettings()} />
        </View>
    </ActionSheet>
  );
};

export default PermissionSettingSheet;

const styles = StyleSheet.create({
  content: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
