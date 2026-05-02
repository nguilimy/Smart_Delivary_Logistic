import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toggle } from '../../components/ui/Toggle';
import { Divider } from '../../components/ui/Divider';
import { useAppStore } from '../../store/useAppStore';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { settings, toggleSetting, setSetting } = useAppStore();
  const themeColors = useThemeColors();

  const handleLanguageChange = () => {
    const langs = ['English', 'Arabic', 'French'];
    const nextIndex = (langs.indexOf(settings.language) + 1) % langs.length;
    setSetting('language', langs[nextIndex]);
  };

  const handleThemeChange = () => {
    const themes = ['Light', 'Dark', 'System'];
    const nextIndex = (themes.indexOf(settings.theme) + 1) % themes.length;
    setSetting('theme', themes[nextIndex]);
  };

  const handleAccentColorChange = () => {
    const colorsList = ['Red', 'Orange', 'Cyan', 'Gray', 'Purple', 'Blue', 'Black'];
    const nextIndex = (colorsList.indexOf(settings.accentColor || 'Red') + 1) % colorsList.length;
    setSetting('accentColor', colorsList[nextIndex]);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'A password reset link has been sent to your email.');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.headerSection, { paddingTop: insets.top + 16, backgroundColor: themeColors.primary }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 44 }} />
        </View>
        <Text style={styles.subtitle}>Configure your app preferences</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Notifications</Text>
        <View style={[styles.section, { backgroundColor: themeColors.white }]}>
          <SettingItem
            label="Push Notifications"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />
          <Divider marginVertical={0} />
          <SettingItem
            label="Email Notifications"
            value={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
          <Divider marginVertical={0} />
          <SettingItem
            label="SMS Notifications"
            value={settings.smsNotifications}
            onToggle={() => toggleSetting('smsNotifications')}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Security</Text>
        <View style={[styles.section, { backgroundColor: themeColors.white }]}>
          <SettingItem
            label="Biometric Login"
            sublabel="Use fingerprint or Face ID"
            value={settings.biometricLogin}
            onToggle={() => toggleSetting('biometricLogin')}
          />
          <Divider marginVertical={0} />
          <TouchableOpacity style={styles.actionItem} onPress={handleChangePassword}>
            <Text style={[styles.itemLabel, { color: themeColors.text }]}>Change Password</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>General</Text>
        <View style={[styles.section, { backgroundColor: themeColors.white }]}>
          <TouchableOpacity style={styles.actionItem} onPress={handleLanguageChange}>
            <Text style={styles.itemLabel}>Language</Text>
            <View style={styles.row}>
              <Text style={styles.itemValue}>{settings.language}</Text>
              <Ionicons name="sync" size={18} color={colors.primary} />
            </View>
          </TouchableOpacity>
          <Divider marginVertical={0} />
          <TouchableOpacity style={styles.actionItem} onPress={handleThemeChange}>
            <Text style={[styles.itemLabel, { color: themeColors.text }]}>App Theme</Text>
            <View style={styles.row}>
              <Text style={[styles.itemValue, { color: themeColors.textMuted }]}>{settings.theme}</Text>
              <Ionicons name="sync" size={18} color={themeColors.primary} />
            </View>
          </TouchableOpacity>
          <Divider marginVertical={0} />
          <TouchableOpacity style={styles.actionItem} onPress={handleAccentColorChange}>
            <Text style={[styles.itemLabel, { color: themeColors.text }]}>Accent Color</Text>
            <View style={styles.row}>
              <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: themeColors.primary, marginRight: 8 }} />
              <Text style={[styles.itemValue, { color: themeColors.textMuted }]}>{settings.accentColor || 'Red'}</Text>
              <Ionicons name="color-palette" size={18} color={themeColors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Logistic Management App</Text>
          <Text style={styles.footerSubtext}>© 2026 Logistic Inc. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ label, sublabel, value, onToggle }: any) => {
  const themeColors = useThemeColors();
  return (
    <View style={styles.settingItem}>
      <View style={styles.itemText}>
        <Text style={[styles.itemLabel, { color: themeColors.text }]}>{label}</Text>
        {sublabel && <Text style={[styles.itemSublabel, { color: themeColors.textMuted }]}>{sublabel}</Text>}
      </View>
      <Toggle value={value} onToggle={onToggle} />
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.white,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 12,
    letterSpacing: 1,
  },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  itemText: {
    flex: 1,
    marginRight: 16,
  },
  itemLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  itemSublabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  itemValue: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textMuted,
  },
  footerSubtext: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
});

export default SettingsScreen;
