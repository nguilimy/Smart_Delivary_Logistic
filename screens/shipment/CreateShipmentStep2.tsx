import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';

const CreateShipmentStep2 = ({ navigation }: any) => {
  const { createShipmentData, updateCreateShipmentData } = useAppStore();

  const handleContinue = () => {
    navigation.navigate('ReviewConfirm');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Create Shipment" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <StepIndicator currentStep={2} />
          
          <Text style={styles.sectionTitle}>Cargo Details</Text>

          <Input
            label="Cargo Description"
            placeholder="Enter detailed description of the items..."
            multiline
            numberOfLines={3}
            style={styles.textArea}
            value={createShipmentData.cargoDescription}
            onChangeText={(text) => updateCreateShipmentData({ cargoDescription: text })}
            maxLength={200}
          />
          <Text style={styles.charCounter}>{createShipmentData.cargoDescription.length}/200</Text>

          <View style={styles.dimensionsRow}>
            <View style={styles.dimInput}>
              <Input
                label="Length (cm)"
                placeholder="0"
                keyboardType="numeric"
                value={createShipmentData.length}
                onChangeText={(text) => updateCreateShipmentData({ length: text })}
              />
            </View>
            <View style={styles.dimInput}>
              <Input
                label="Width (cm)"
                placeholder="0"
                keyboardType="numeric"
                value={createShipmentData.width}
                onChangeText={(text) => updateCreateShipmentData({ width: text })}
              />
            </View>
            <View style={styles.dimInput}>
              <Input
                label="Height (cm)"
                placeholder="0"
                keyboardType="numeric"
                value={createShipmentData.height}
                onChangeText={(text) => updateCreateShipmentData({ height: text })}
              />
            </View>
          </View>

          <Input
            label="Special Instructions"
            placeholder="Any special handling requirements..."
            multiline
            numberOfLines={3}
            style={styles.textArea}
            value={createShipmentData.specialInstructions}
            onChangeText={(text) => updateCreateShipmentData({ specialInstructions: text })}
            maxLength={200}
          />
          <Text style={styles.charCounter}>{createShipmentData.specialInstructions.length}/200</Text>

          <Text style={styles.label}>Upload Documents</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <MaterialCommunityIcons name="file-upload-outline" size={32} color={colors.primary} />
            <Text style={styles.uploadText}>Tap to upload or browse</Text>
            <Text style={styles.uploadSubtext}>Invoice, Packing List, etc.</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <View style={styles.flex1}>
              <Button title="Back" variant="outline" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.flex1}>
              <Button title="Continue" onPress={handleContinue} />
            </View>
          </View>
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  charCounter: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: -12,
    marginBottom: 16,
  },
  dimensionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dimInput: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.text,
    marginBottom: 8,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    backgroundColor: colors.surface,
  },
  uploadText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
  uploadSubtext: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
});

export default CreateShipmentStep2;
