import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import {COLORS} from 'colors';

export const TextInput = ({...props}: TextInputProps) => {
  return <RNTextInput style={styles.textInputStyle} {...props} />;
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderColor: COLORS.primaryLight,
    borderWidth: 1,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
