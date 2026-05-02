import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { Shipment } from '../../types';
import { getProgressColor } from '../../utils/helpers';

interface ShipmentRowProps {
  shipment: Shipment;
  onPress: () => void;
}

export const ShipmentRow: React.FC<ShipmentRowProps> = ({ shipment, onPress }) => {
  const progressColor = getProgressColor(shipment.progress);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="package-variant" size={22} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.id}>{shipment.id}</Text>
        <Text style={styles.route}>
          {shipment.pickup.city} → {shipment.delivery.city}
        </Text>
      </View>
      <View style={[styles.progressBadge, { backgroundColor: progressColor + '18' }]}>
        <Text style={[styles.progressText, { color: progressColor }]}>
          {shipment.progress}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  id: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  route: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  progressText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
});
