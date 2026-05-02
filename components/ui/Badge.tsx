import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { getStatusColor, getStatusBgColor } from '../../utils/helpers';

interface BadgeProps {
  status: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md', showDot = false }) => {
  const bgColor = getStatusBgColor(status);
  const textColor = getStatusColor(status);

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, size === 'sm' && styles.badgeSm]}>
      {showDot && <View style={[styles.dot, { backgroundColor: textColor }]} />}
      <Text style={[styles.text, { color: textColor }, size === 'sm' && styles.textSm]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  textSm: {
    fontSize: 10,
  },
});
