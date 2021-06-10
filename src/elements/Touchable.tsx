import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
}

export const Touchable = ({children, ...props}: Props) => (
  <TouchableOpacity style={style.container} activeOpacity={0.8} {...props}>
    {children}
  </TouchableOpacity>
);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
