import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';

const initialAlerts = [
  { id: '1', title: 'Shipment Delivered', description: 'Your shipment SHP-2024-001 has been delivered.', time: '10 mins ago', type: 'success', icon: 'checkmark-circle' },
  { id: '2', title: 'New Fleet Vehicle Added', description: 'Vehicle "Van 03" was successfully registered to your fleet.', time: '1 hour ago', type: 'info', icon: 'information-circle' },
  { id: '3', title: 'Route Update', description: 'Driver is experiencing heavy traffic, ETA delayed by 15 mins.', time: '2 hours ago', type: 'warning', icon: 'warning' },
];

const AlertsScreen = () => {
  const insets = useSafeAreaInsets();
  const [alerts, setAlerts] = useState(initialAlerts);
  const themeColors = useThemeColors();

  const clearAlerts = () => {
    setAlerts([]);
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'info': return colors.info;
      default: return colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Alerts</Text>
          {alerts.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearAlerts}>
              <Ionicons name="trash-outline" size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.subtitle}>Stay updated with your shipment progress</Text>
      </View>

      {alerts.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={[styles.iconCircle, { backgroundColor: themeColors.white }]}>
              <MaterialCommunityIcons name="bell-ring-outline" size={60} color={themeColors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: themeColors.text }]}>All Caught Up!</Text>
            <Text style={[styles.emptySubtitle, { color: themeColors.textMuted }]}>
              You don't have any notifications right now. Stay tuned for real-time updates on your deliveries.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent}>
          {alerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, { backgroundColor: themeColors.white }]}>
              <View style={[styles.iconContainer, { backgroundColor: getIconColor(alert.type) + '20' }]}>
                <Ionicons name={alert.icon as any} size={24} color={getIconColor(alert.type)} />
              </View>
              <View style={styles.alertInfo}>
                <View style={styles.alertHeader}>
                  <Text style={[styles.alertTitle, { color: themeColors.text }]}>{alert.title}</Text>
                  <Text style={[styles.alertTime, { color: themeColors.textMuted }]}>{alert.time}</Text>
                </View>
                <Text style={[styles.alertDesc, { color: themeColors.textMuted }]}>{alert.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.white,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  clearBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertInfo: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  alertTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  alertTime: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  alertDesc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
});

export default AlertsScreen;
