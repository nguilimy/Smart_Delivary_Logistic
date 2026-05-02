import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { TimelineEvent } from '../../types';

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLast }) => {
  const dotColor = event.completed
    ? colors.success
    : event.current
    ? colors.primary
    : colors.textMuted;

  const lineColor = event.completed ? colors.success : '#E0E0E0';

  return (
    <View style={styles.container}>
      <View style={styles.dotColumn}>
        <View style={[styles.dot, { backgroundColor: dotColor }]}>
          {event.completed && <Text style={styles.checkmark}>✓</Text>}
          {event.current && <View style={styles.innerDot} />}
        </View>
        {!isLast && <View style={[styles.line, { backgroundColor: lineColor }]} />}
      </View>
      <View style={styles.content}>
        <Text style={[styles.status, event.current && styles.statusCurrent]}>
          {event.status}
        </Text>
        <Text style={styles.timestamp}>
          {event.timestamp || (event.status === 'Delivered' ? 'Expected May 25' : 'Pending')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 60,
  },
  dotColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  status: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  statusCurrent: {
    color: colors.primary,
  },
  timestamp: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
