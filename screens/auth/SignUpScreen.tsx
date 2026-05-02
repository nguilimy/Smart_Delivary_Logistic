import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/Button';

const SignUpScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const scaleAnim = new Animated.Value(0);
  const login = useAppStore((state) => state.login);
  const themeColors = useThemeColors();

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = () => {
    if (!fullName || !email || !password || password !== confirmPassword) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
    }, 200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: themeColors.white, borderColor: themeColors.border }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: themeColors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: themeColors.textMuted }]}>Join the smarter delivery network</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Full Name</Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }, nameFocused && { borderColor: themeColors.primary }]}>
                <Ionicons name="person-outline" size={20} color={nameFocused ? themeColors.primary : themeColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="John Doe"
                  placeholderTextColor={themeColors.textMuted}
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Email Address</Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }, emailFocused && { borderColor: themeColors.primary }]}>
                <Ionicons name="mail-outline" size={20} color={emailFocused ? themeColors.primary : themeColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="john@example.com"
                  placeholderTextColor={themeColors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Password</Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }, passwordFocused && { borderColor: themeColors.primary }]}>
                <Ionicons name="lock-closed-outline" size={20} color={passwordFocused ? themeColors.primary : themeColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={themeColors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={themeColors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Confirm Password</Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.white, borderColor: themeColors.border }, confirmFocused && { borderColor: themeColors.primary }]}>
                <Ionicons name="lock-closed-outline" size={20} color={confirmFocused ? themeColors.primary : themeColors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={themeColors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                />
              </View>
            </View>

            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              size="lg"
              style={{ marginTop: 20 }}
            />
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: themeColors.textMuted }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.signinLink, { color: themeColors.primary }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textMuted,
  },
  form: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: 10,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    height: 56,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
    marginTop: 20,
  },
  footerText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textMuted,
  },
  signinLink: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});

export default SignUpScreen;
