import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';
import { ShipmentRow } from '../../components/shipment/ShipmentRow';
import { Card } from '../../components/ui/Card';

const ShipmentsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { shipments, setSelectedShipment } = useAppStore();
  const themeColors = useThemeColors();

  const activeShipments = shipments.filter(s => s.status !== 'Delivered' && s.status !== 'Cancelled');
  
  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Shipments</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="filter" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Track and manage your active deliveries</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Active Shipments</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: themeColors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {activeShipments.map((shipment) => (
          <ShipmentRow
            key={shipment.id}
            shipment={shipment}
            onPress={() => {
              setSelectedShipment(shipment);
              navigation.navigate('Shipments', { screen: 'ShipmentDetail' });
            }}
          />
        ))}

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Performance Analytics</Text>
        <Card style={[styles.performanceCard, { backgroundColor: themeColors.white }]}>
          <View style={styles.chartPlaceholder}>
            <View style={styles.ringContainer}>
              <View style={[styles.ring, { borderColor: themeColors.border, borderTopColor: 'transparent' }]} />
              <View style={styles.ringTextContainer}>
                <Text style={[styles.ringPercent, { color: themeColors.text }]}>85%</Text>
                <Text style={styles.ringLabel}>On Time</Text>
              </View>
            </View>
            <View style={styles.legend}>
              <LegendItem color={colors.success} label="On Time" value="85%" />
              <LegendItem color={colors.warning} label="Delayed" value="10%" />
              <LegendItem color={themeColors.primary} label="Issues" value="5%" />
            </View>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>History</Text>
        {shipments.filter(s => s.status === 'Delivered').map((shipment) => (
          <ShipmentRow
            key={shipment.id}
            shipment={shipment}
            onPress={() => {
              setSelectedShipment(shipment);
              navigation.navigate('Shipments', { screen: 'ShipmentDetail' });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const LegendItem = ({ color, label, value }: any) => {
  const themeColors = useThemeColors();
  return (
    <View style={styles.legendItem}>
      <View style={styles.legendRow}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={[styles.legendLabel, { color: themeColors.textMuted }]}>{label}</Text>
      </View>
      <Text style={[styles.legendValue, { color: themeColors.text }]}>{value}</Text>
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
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginTop: 12,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  viewAll: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
  performanceCard: {
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  chartPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ringContainer: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: '#F0F0F0',
  },
  ringTextContainer: {
    alignItems: 'center',
  },
  ringPercent: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.text,
  },
  ringLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  legend: {
    flex: 1,
    marginLeft: 32,
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  legendValue: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
  },
});

export default ShipmentsScreen;
