import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';
import { StatCard } from '../../components/shipment/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShipmentRow } from '../../components/shipment/ShipmentRow';
import { getGreeting } from '../../utils/helpers';
import { BlurView } from 'expo-blur';

const DashboardScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user, dashboardStats, shipments } = useAppStore();
  const themeColors = useThemeColors();
  const greeting = getGreeting();

  const recentShipments = shipments.slice(0, 3);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>
              {greeting}, {user?.name.split(' ')[0]}! 👋
            </Text>
            <Text style={styles.headerSubtitle}>Ready for your next delivery?</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => navigation.navigate('Alerts')}>
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
            <View style={[styles.badge, { borderColor: themeColors.primary }]} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
            <StatCard
              title="Total Shipments"
              value={dashboardStats.totalShipments}
              change={dashboardStats.totalShipmentsChange}
            />
            <StatCard
              title="In Transit"
              value={dashboardStats.inTransit}
              change={dashboardStats.inTransitChange}
              valueColor={colors.warning}
            />
            <StatCard
              title="Delivered"
              value={dashboardStats.delivered}
              change={dashboardStats.deliveredChange}
              valueColor={colors.success}
            />
          </ScrollView>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Actions</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsRow}>
          <QuickAction
            icon="plus-box"
            label="New"
            color={themeColors.primary}
            onPress={() => navigation.navigate('CreateShipment')}
          />
          <QuickAction
            icon="map-marker-path"
            label="Track"
            color={colors.info}
            onPress={() => navigation.navigate('Shipments')}
          />
          <QuickAction
            icon="truck-plus"
            label="Fleet"
            color={colors.success}
            onPress={() => navigation.navigate('Fleet')}
          />
          <QuickAction
            icon="alert-octagon"
            label="Support"
            color={colors.warning}
            onPress={() => {}}
          />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recent Deliveries</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Shipments')}>
            <Text style={[styles.viewAll, { color: themeColors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentShipments.map((shipment) => (
          <ShipmentRow
            key={shipment.id}
            shipment={shipment}
            onPress={() => {
              useAppStore.getState().setSelectedShipment(shipment);
              navigation.navigate('Shipments', { screen: 'ShipmentDetail' });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const QuickAction = ({ icon, label, color, onPress }: any) => {
  const themeColors = useThemeColors();
  const theme = useAppStore((state) => state.settings?.theme) || 'Light';
  
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionIconContainer}>
        <BlurView intensity={theme === 'Dark' ? 20 : 40} style={styles.glassActionIcon}>
          <View style={[styles.actionIcon, { borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 }]}>
            <MaterialCommunityIcons name={icon} size={28} color={color} />
          </View>
        </BlurView>
      </View>
      <Text style={[styles.actionLabel, { color: themeColors.text }]}>{label}</Text>
    </TouchableOpacity>
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
    paddingBottom: 80,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  statsContainer: {
    position: 'absolute',
    bottom: -60,
    left: 20,
    right: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    letterSpacing: -0.3,
  },
  viewAll: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
  },
  actionItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  glassActionIcon: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  actionIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
});

export default DashboardScreen;
