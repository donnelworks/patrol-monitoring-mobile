import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Text } from '@components';
import { Gap, Icon } from '@themes';
import { colors } from '@styles';

const PickImageSheet = (props) => {

  return (
    <ActionSheet
      gestureEnabled
      springOffset={90}
      closeAnimationConfig={{
        stiffness: 95.8,
        damping: 14.7,
        mass: 1,
      }}
      indicatorStyle={{
        backgroundColor: '#FFFFFF'
      }}
      containerStyle={{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // paddingTop: 10,
      }}>
        <View style={styles.content}>
          <Text type="OpenSansSemiBold" size={15}>Pilih Media Foto</Text>
          <Gap height={10} />
          <TouchableOpacity onPress={() => SheetManager.hide(props.sheetId, {
              payload: 'camera',
          })}>
              <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <Icon.Camera size={20} fillColor={colors.softSecondary} strokeColor={colors.secondary} style={{marginRight: 15}} />
                  <Text>Ambil dari kamera</Text>
              </View>
          </TouchableOpacity>
          <View style={{height: 1, marginVertical: 10, backgroundColor: colors.softGray}} />
          <TouchableOpacity onPress={() => SheetManager.hide(props.sheetId, {
              payload: 'gallery',
          })}>
              <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <Icon.ImageDirectory size={20} fillColor={colors.softSecondary} strokeColor={colors.secondary} style={{marginRight: 15}} />
                  <Text>Ambil dari galeri</Text>
              </View>
          </TouchableOpacity>
        </View>
    </ActionSheet>
  );
};

export default PickImageSheet;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
