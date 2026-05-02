import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  valueColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  valueColor = colors.text,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isPositive = change >= 0;

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(value / 30);
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setDisplayValue(current);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{displayValue}</Text>
      <Text style={[styles.change, { color: isPositive ? colors.success : colors.danger }]}>
        {isPositive ? '+' : ''}
        {change}% vs yesterday
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 22,
    marginBottom: 4,
  },
  change: {
    fontFamily: fonts.regular,
    fontSize: 10,
  },
});
