import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActionSheet, {
  ScrollView,
} from 'react-native-actions-sheet';
import {colors} from '@styles';

const BasicSheet = (props) => {

  // const vegieData = props.payload.data;

  return (
    <ActionSheet
      snapPoints={[60, 100]}
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
        backgroundColor: 'white',
        height: '80%',
        maxHeight: '80%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          {vegieData?.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Text style={{color: colors?.font, marginVertical: 10}}>
                  {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>
    </ActionSheet>
  );
};

export default BasicSheet;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
  },
});
