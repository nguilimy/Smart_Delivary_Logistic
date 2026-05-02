import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Divider } from '../../components/ui/Divider';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { formatCurrency } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const ReviewConfirmScreen = ({ navigation }: any) => {
  const { createShipmentData, submitShipment } = useAppStore();

  const handleConfirm = () => {
    submitShipment();
    Alert.alert(
      "Success!",
      "Your shipment has been created successfully.",
      [{ text: "OK", onPress: () => navigation.navigate('MainTabs', { screen: 'Dashboard' }) }]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Create Shipment" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <StepIndicator currentStep={4} />
        
        <Text style={styles.sectionTitle}>Review & Confirm</Text>

        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="checkmark" size={20} color={colors.success} />
          </View>
          <Text style={styles.bannerText}>
            All details look good! Review and confirm your shipment.
          </Text>
        </View>

        <Card style={styles.summaryCard}>
          <SummaryRow label="Type" value={createShipmentData.shipmentType || 'Standard Delivery'} />
          <Divider marginVertical={12} />
          <SummaryRow label="Pickup" value={createShipmentData.pickupLocation || 'Not specified'} />
          <Divider marginVertical={12} />
          <SummaryRow label="Delivery" value={createShipmentData.deliveryLocation || 'Not specified'} />
          <Divider marginVertical={12} />
          <SummaryRow label="Cargo" value={createShipmentData.cargoType || 'General'} />
          <Divider marginVertical={12} />
          <SummaryRow label="Weight" value={`${createShipmentData.weight || '0'} kg`} />
          <Divider marginVertical={12} />
          <SummaryRow label="Est. Delivery" value="May 28, 2024" />
          <Divider marginVertical={16} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>{formatCurrency(285.90)}</Text>
          </View>
        </Card>

        <View style={styles.buttonRow}>
          <View style={styles.flex1}>
            <Button title="Back" variant="outline" onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.flex1}>
            <Button title="Create Shipment" onPress={handleConfirm} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const SummaryRow = ({ label, value }: any) => (
  <View style={styles.summaryRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  bannerIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(29, 185, 122, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.success,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
    maxWidth: '65%',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
  totalValue: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
});

export default ReviewConfirmScreen;
