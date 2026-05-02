import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Linking, Alert, Dimensions } from 'react-native';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { TimelineItem } from '../../components/shipment/TimelineItem';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

const { width } = Dimensions.get('window');

const LiveTrackingScreen = ({ navigation }: any) => {
  const { selectedShipment } = useAppStore();
  const themeColors = useThemeColors();

  if (!selectedShipment) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.surface, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>No shipment selected</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary, fontFamily: fonts.semiBold }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { driver, timeline } = selectedShipment;
  const currentStep = timeline.find(step => step.current);

  const handleCall = () => {
    if (driver?.phone) {
      Linking.openURL(`tel:${driver.phone}`);
    } else {
      Linking.openURL('tel:+15551234567'); // Fallback dummy number
    }
  };

  const handleMessage = () => {
    if (driver?.phone) {
      Linking.openURL(`sms:${driver.phone}`);
    } else {
      Linking.openURL('sms:+15551234567'); // Fallback dummy number
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <ScreenHeader
        title="Live Tracking"
        subtitle={selectedShipment.id}
        onBack={() => navigation.goBack()}
        rightIcon={
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerInfo, { backgroundColor: themeColors.white, borderColor: themeColors.border }]}>
          <Text style={[styles.shipmentId, { color: themeColors.text }]}>{selectedShipment.id}</Text>
          <Text style={[styles.shipmentType, { color: themeColors.textSecondary }]}>{selectedShipment.type} Delivery</Text>
        </View>

        <Card style={[styles.driverCard, { backgroundColor: themeColors.white }]}>
          <View style={styles.driverRow}>
            <Avatar name={selectedShipment.driver?.name || 'John Smith'} size={44} />
            <View style={styles.driverText}>
              <Text style={[styles.driverName, { color: themeColors.text }]}>{selectedShipment.driver?.name || 'John Smith'}</Text>
              <Text style={[styles.driverRole, { color: themeColors.textSecondary }]}>Professional Driver</Text>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: themeColors.primaryLight }]} onPress={handleCall}>
                <Ionicons name="call" size={18} color={themeColors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: themeColors.primaryLight }]} onPress={handleMessage}>
                <Ionicons name="chatbubble-ellipses" size={18} color={themeColors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Map Visualization */}
        <View style={styles.mapContainer}>
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop' }} 
            style={styles.mapPlaceholder}
          >
            <View style={styles.mapOverlay} />
            <View style={[styles.routeLine, { borderColor: themeColors.primary }]} />
            <View style={[styles.pickupMarker, { backgroundColor: themeColors.primary + '33' }]}>
              <View style={[styles.pickupDot, { backgroundColor: themeColors.primary }]} />
            </View>
            <View style={[styles.truckIconContainer, { backgroundColor: themeColors.primary }]}>
              <MaterialCommunityIcons name="truck-fast" size={24} color={colors.white} />
            </View>
            <View style={styles.deliveryMarker}>
              <Ionicons name="location" size={28} color={themeColors.primary} />
            </View>
            
            <View style={[styles.etaBadge, { backgroundColor: themeColors.white }]}>
              <Text style={[styles.etaText, { color: themeColors.primary }]}>15 min away</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.timelineSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Delivery Timeline</Text>
          <View style={styles.timelineContainer}>
            {selectedShipment.timeline.map((event, index) => (
              <TimelineItem
                key={index}
                event={event}
                isLast={index === selectedShipment.timeline.length - 1}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerInfo: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  shipmentId: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
  shipmentType: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  driverCard: {
    margin: 16,
    padding: 12,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverText: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
  },
  driverRole: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  routeLine: {
    position: 'absolute',
    top: '35%',
    left: '20%',
    width: '60%',
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderStyle: 'dashed',
  },
  pickupMarker: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(232, 35, 42, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  deliveryMarker: {
    position: 'absolute',
    top: '55%',
    left: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckIconContainer: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.white,
  },
  etaBadge: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  etaText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primary,
  },
  timelineSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
});

export default LiveTrackingScreen;
