import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface DividerProps {
  color?: string;
  marginVertical?: number;
}

export const Divider: React.FC<DividerProps> = ({
  color = colors.border,
  marginVertical = 16,
}) => {
  return <View style={[styles.divider, { backgroundColor: color, marginVertical }]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});
