import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';

const VehiclesScreen = () => {
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const [vehicles, setVehicles] = useState<{ id: string; name: string; type: string }[]>([]);

  const handleAddVehicle = () => {
    const newId = (vehicles.length + 1).toString();
    const newVehicle = { id: newId, name: `Vehicle ${newId}`, type: 'Van' };
    setVehicles([...vehicles, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>My Vehicles</Text>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddVehicle}>
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Manage and track your delivery fleet</Text>
      </View>

      {vehicles.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={[styles.iconCircle, { backgroundColor: themeColors.white }]}>
              <MaterialCommunityIcons name="car-multiple" size={60} color={themeColors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: themeColors.text }]}>No Vehicles Registered</Text>
            <Text style={[styles.emptySubtitle, { color: themeColors.textMuted }]}>
              Tap the + button above to add a new vehicle to your fleet.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent}>
          {vehicles.map((vehicle) => (
            <View key={vehicle.id} style={[styles.vehicleCard, { backgroundColor: themeColors.white }]}>
              <View style={styles.vehicleInfo}>
                <View style={[styles.vehicleIconBg, { backgroundColor: themeColors.primaryLight }]}>
                  <MaterialCommunityIcons name="van-utility" size={24} color={themeColors.primary} />
                </View>
                <View>
                  <Text style={[styles.vehicleName, { color: themeColors.text }]}>{vehicle.name}</Text>
                  <Text style={[styles.vehicleType, { color: themeColors.textMuted }]}>{vehicle.type}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeVehicle(vehicle.id)} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={20} color={colors.danger} />
              </TouchableOpacity>
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
  addBtn: {
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
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  vehicleIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
  vehicleType: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  removeBtn: {
    padding: 8,
  },
});

export default VehiclesScreen;
