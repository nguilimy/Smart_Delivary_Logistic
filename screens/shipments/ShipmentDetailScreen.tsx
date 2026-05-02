import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Share, Linking, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Divider } from '../../components/ui/Divider';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { formatCurrency } from '../../utils/helpers';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ShipmentDetailScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { selectedShipment } = useAppStore();
  const themeColors = useThemeColors();

  if (!selectedShipment) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Tracking Details for Shipment ${selectedShipment.id}:\nStatus: ${selectedShipment.status}\nEstimated Delivery: ${selectedShipment.estimatedDelivery}\nTo: ${selectedShipment.delivery.label}`,
      });
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  const handleCallDriver = () => {
    // Dummy phone number, in reality this comes from selectedShipment.driver.phone
    const phoneNumber = '+1234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to open dialer');
    });
  };

  const handleMessageDriver = () => {
    const phoneNumber = '+1234567890';
    Linking.openURL(`sms:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to open messaging app');
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Shipment Detail</Text>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBadgeContainer}>
          <Badge status={selectedShipment.status} showDot />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={[styles.mapContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }]}>
          <View style={styles.mapPlaceholder}>
            <MaterialCommunityIcons name="map-marker-distance" size={48} color={themeColors.primary} />
            <Text style={[styles.mapText, { color: themeColors.textMuted }]}>Route Visualization</Text>
          </View>
        </View>

        <View style={styles.mainInfo}>
          <View style={styles.idRow}>
            <View>
              <Text style={[styles.shipmentId, { color: themeColors.text }]}>{selectedShipment.id}</Text>
              <Text style={[styles.shipmentType, { color: themeColors.textMuted }]}>{selectedShipment.type} Delivery</Text>
            </View>
            <Text style={[styles.cost, { color: themeColors.primary }]}>{formatCurrency(selectedShipment.totalCost)}</Text>
          </View>

          <Card style={[styles.infoCard, { backgroundColor: themeColors.white }]}>
            <InfoRow icon="cube-outline" label="Type" value={selectedShipment.cargo.type} themeColors={themeColors} />
            <Divider marginVertical={12} />
            <InfoRow icon="location-outline" label="Pickup" value={selectedShipment.pickup.label} themeColors={themeColors} />
            <Divider marginVertical={12} />
            <InfoRow icon="flag-outline" label="Delivery" value={selectedShipment.delivery.label} themeColors={themeColors} />
            <Divider marginVertical={12} />
            <InfoRow icon="calendar-outline" label="Est. Delivery" value={selectedShipment.estimatedDelivery} themeColors={themeColors} />
          </Card>

          {selectedShipment.driver && (
            <>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Driver Information</Text>
              <Card style={[styles.driverCard, { backgroundColor: themeColors.white }]}>
                <View style={styles.driverInfo}>
                  <Avatar name={selectedShipment.driver.name} size={48} />
                  <View style={styles.driverDetails}>
                    <Text style={[styles.driverName, { color: themeColors.text }]}>{selectedShipment.driver.name}</Text>
                    <Text style={[styles.driverRole, { color: themeColors.textMuted }]}>Professional Driver</Text>
                  </View>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: themeColors.primaryLight }]} onPress={handleCallDriver}>
                      <Ionicons name="call" size={20} color={themeColors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: themeColors.primaryLight }]} onPress={handleMessageDriver}>
                      <Ionicons name="chatbubble-ellipses" size={20} color={themeColors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </>
          )}

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Cargo Information</Text>
          <Card style={[styles.infoCard, { backgroundColor: themeColors.white }]}>
            <View style={styles.cargoDetails}>
              <View style={styles.cargoItem}>
                <Text style={[styles.cargoLabel, { color: themeColors.textMuted }]}>Category</Text>
                <Text style={[styles.cargoValue, { color: themeColors.text }]}>{selectedShipment.cargo.type}</Text>
              </View>
              <View style={styles.cargoItem}>
                <Text style={[styles.cargoLabel, { color: themeColors.textMuted }]}>Weight</Text>
                <Text style={[styles.cargoValue, { color: themeColors.text }]}>{selectedShipment.cargo.weight} kg</Text>
              </View>
            </View>
            <Divider marginVertical={12} />
            <Text style={[styles.cargoLabel, { color: themeColors.textMuted }]}>Description</Text>
            <Text style={[styles.descriptionText, { color: themeColors.textSecondary }]}>{selectedShipment.cargo.description}</Text>
          </Card>

          <Button
            title="Live Tracking"
            onPress={() => navigation.navigate('LiveTracking')}
            style={styles.trackBtn}
            icon={<MaterialCommunityIcons name="map-marker-path" size={20} color="#FFFFFF" />}
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ icon, label, value, themeColors }: any) => (
  <View style={styles.rowBetween}>
    <View style={styles.iconRow}>
      <Ionicons name={icon} size={20} color={themeColors.primary} />
      <Text style={[styles.infoLabel, { color: themeColors.textMuted }]}>{label}</Text>
    </View>
    <Text style={[styles.infoValue, { color: themeColors.text }]}>{value}</Text>
  </View>
);

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
    marginBottom: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.white,
    letterSpacing: -0.5,
  },
  headerBadgeContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#F0F0F0',
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
  },
  mainInfo: {
    paddingHorizontal: 20,
  },
  idRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  shipmentId: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.text,
    letterSpacing: -0.5,
  },
  shipmentType: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  cost: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
  },
  infoCard: {
    padding: 20,
    marginBottom: 24,
    borderRadius: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  infoValue: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
    maxWidth: '60%',
    textAlign: 'right',
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  driverCard: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverDetails: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
  driverRole: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cargoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cargoItem: {
    flex: 1,
  },
  cargoLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  cargoValue: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  trackBtn: {
    marginTop: 8,
  },
});

export default ShipmentDetailScreen;
