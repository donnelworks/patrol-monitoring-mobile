import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '@styles';

const Button = ({title, fillColor, disabled, loadingBtn, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: (!disabled && fillColor) ? fillColor : (disabled && fillColor) ? colors.gray : colors.secondary}]} onPress={onPress} disabled={disabled}>
      {loadingBtn ? (<ActivityIndicator color="#FFFFFF" />) : (<Text style={styles.buttonText}>{title}</Text>)}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: fonts.type.OpenSansBold,
    fontSize: fonts.size.value(14),
    color: '#FFFFFF',
  },
});
