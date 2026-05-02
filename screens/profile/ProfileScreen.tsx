import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../../components/ui/Avatar';
import { Divider } from '../../components/ui/Divider';

const ProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user, dashboardStats, logout, updateUser } = useAppStore();
  const themeColors = useThemeColors();

  const handlePickImage = async () => {
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraStatus !== 'granted') {
              Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
              return;
            }
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled) {
              updateUser({ avatar: result.assets[0].uri });
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled) {
              updateUser({ avatar: result.assets[0].uri });
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.header, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            {user?.avatar && user.avatar.startsWith('http') === false ? (
              <Image source={{ uri: user.avatar }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <Avatar name={user?.name || 'John Smith'} size={80} backgroundColor={colors.white} textColor={themeColors.primary} />
            )}
            <TouchableOpacity style={[styles.editBtn, { backgroundColor: themeColors.info || colors.info }]} onPress={handlePickImage}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>Professional Driver</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.white} />
            <Text style={styles.verifiedText}>Verified Driver</Text>
          </View>
        </View>

        <View style={[styles.statsRow, { backgroundColor: themeColors.white }]}>
          <StatItem label="Deliveries" value={dashboardStats?.delivered || '0'} themeColors={themeColors} />
          <StatItem label="Rating" value="4.9" themeColors={themeColors} />
          <StatItem label="Years" value="2" themeColors={themeColors} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.menuSection}>
          <MenuItem icon="person-outline" label="Personal Information" onPress={() => navigation.navigate('Placeholder', { title: 'Personal Information' })} themeColors={themeColors} />
          <MenuItem icon="car-outline" label="Vehicle Information" onPress={() => navigation.navigate('Placeholder', { title: 'Vehicle Information' })} themeColors={themeColors} />
          <MenuItem 
            icon="document-text-outline" 
            label="Documents" 
            onPress={() => navigation.navigate('Placeholder', { title: 'Documents' })}
            rightElement={
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>Verified ✓</Text>
              </View>
            } 
          />
          <MenuItem icon="wallet-outline" label="Payment Information" onPress={() => navigation.navigate('Placeholder', { title: 'Payment Information' })} />
          <MenuItem icon="bar-chart-outline" label="Performance Analytics" onPress={() => navigation.navigate('Placeholder', { title: 'Performance Analytics' })} themeColors={themeColors} />
          
          <View style={[styles.sectionSpacer, { backgroundColor: themeColors.surface }]} />
          
          <MenuItem icon="help-circle-outline" label="Support & Help" onPress={() => navigation.navigate('Placeholder', { title: 'Support & Help' })} themeColors={themeColors} />
          <MenuItem icon="information-circle-outline" label="About Logistic" onPress={() => navigation.navigate('Placeholder', { title: 'About Logistic' })} />
          
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Ionicons name="log-out-outline" size={22} color={colors.danger} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.2.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const StatItem = ({ label, value, themeColors }: any) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color: themeColors?.text }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: themeColors?.textMuted }]}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, label, rightElement, onPress, themeColors }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={[styles.menuIconBg, { backgroundColor: themeColors?.primaryLight || colors.primaryLight }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={[styles.menuLabel, { color: themeColors?.text }]}>{label}</Text>
    </View>
    <View style={styles.menuRight}>
      {rightElement}
      <Ionicons name="chevron-forward" size={18} color={themeColors?.textMuted || colors.textMuted} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
    letterSpacing: -0.5,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 44,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.info,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.white,
  },
  role: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 12,
    gap: 4,
  },
  verifiedText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    marginTop: 24,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  menuSection: {
    padding: 16,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusPill: {
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.success,
  },
  sectionSpacer: {
    height: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEAEA',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 10,
  },
  logoutText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.danger,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default ProfileScreen;
