import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';

const CreateShipmentStep1 = ({ navigation }: any) => {
  const { createShipmentData, updateCreateShipmentData } = useAppStore();

  const handleContinue = () => {
    // Validation would go here
    navigation.navigate('CreateShipmentStep2');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Create Shipment" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <StepIndicator currentStep={1} />
          
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <Input
            label="Shipment Type"
            placeholder="Select type (Standard, Express, etc.)"
            value={createShipmentData.shipmentType}
            onChangeText={(text) => updateCreateShipmentData({ shipmentType: text })}
            leftIcon={<Ionicons name="layers-outline" size={20} color={colors.textMuted} />}
          />

          <Input
            label="Pickup Location"
            placeholder="Enter pickup address"
            value={createShipmentData.pickupLocation}
            onChangeText={(text) => updateCreateShipmentData({ pickupLocation: text })}
            leftIcon={<Ionicons name="location-outline" size={20} color={colors.textMuted} />}
          />

          <Input
            label="Delivery Location"
            placeholder="Enter delivery address"
            value={createShipmentData.deliveryLocation}
            onChangeText={(text) => updateCreateShipmentData({ deliveryLocation: text })}
            leftIcon={<Ionicons name="flag-outline" size={20} color={colors.textMuted} />}
          />

          <Input
            label="Cargo Type"
            placeholder="Select cargo type (Electronics, etc.)"
            value={createShipmentData.cargoType}
            onChangeText={(text) => updateCreateShipmentData({ cargoType: text })}
            leftIcon={<Ionicons name="cube-outline" size={20} color={colors.textMuted} />}
          />

          <Input
            label="Weight (kg)"
            placeholder="0.00"
            keyboardType="numeric"
            value={createShipmentData.weight}
            onChangeText={(text) => updateCreateShipmentData({ weight: text })}
            rightIcon={<Text style={styles.suffix}>kg</Text>}
            leftIcon={<Ionicons name="barbell-outline" size={20} color={colors.textMuted} />}
          />

          <View style={styles.spacer} />
          
          <Button title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
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
  suffix: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textMuted,
  },
  spacer: {
    height: 20,
  },
});

export default CreateShipmentStep1;
