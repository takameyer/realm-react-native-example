import React from 'react';
import {Text as RNText, TextProps, StyleSheet} from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
  label?: boolean;
}

export const Text = ({children, label, ...props}: Props) => (
  <RNText style={[label ? styles.labelStyle : null, props.style]} {...props}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  labelStyle: {
    paddingHorizontal: 12,
  },
});
