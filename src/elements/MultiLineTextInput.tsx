import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import {COLORS} from 'colors';

export const MultiLineTextInput = ({...props}: TextInputProps) => {
  return (
    <RNTextInput style={styles.textInputStyle} multiline={true} {...props} />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: COLORS.primaryLight,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
