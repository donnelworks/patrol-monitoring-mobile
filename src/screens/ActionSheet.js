import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '@themes';
import {colors} from '@styles';
import {Button} from '@components';
import {SheetManager} from 'react-native-actions-sheet';

const ActionSheet = () => {
  const vegieData = [
    `🍅 Tomato`,
    '🥕 Carrot',
    '🥦 Broccoli',
    '🥒 Cucumber',
    '🌶️ Hot Pepper',
    '🫑 Bell Pepper',
    '🧄 Garlic',
    '🧅 Onion',
    '🍄 Mushroom',
    '🥔 Potato',
    '🥬 Leafy Green',
    '🥑 Avocado',
    '🍆 Eggplant',
    '🥝 Kiwi Fruit',
    '🍓 Strawberry',
    '🍈 Melon',
    '🍒 Cherries',
    '🍑 Peach',
    '🍍 Pineapple',
    '🥭 Mango',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
  ];
  
  return (
    <Screen
      padding="15 15 15 15"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        title="Basic Sheet"
        onPress={() => SheetManager?.show('basic-sheet', {payload: {data: vegieData}})}
      />
    </Screen>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({});
