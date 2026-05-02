import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  const { isAuthenticated, hasSeenOnboarding } = useAppStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for the start button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-proceed only if the user has already seen onboarding
    if (hasSeenOnboarding) {
      const timer = setTimeout(() => {
        handleStart();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenOnboarding]);

  const handleStart = () => {
    if (!hasSeenOnboarding) {
      navigation.replace('Onboarding');
    } else if (!isAuthenticated) {
      navigation.replace('Auth');
    } else {
      navigation.replace('App');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TouchableOpacity 
          activeOpacity={hasSeenOnboarding ? 1 : 0.8} 
          onPress={hasSeenOnboarding ? undefined : handleStart}
          style={styles.touchable}
          disabled={hasSeenOnboarding}
        >
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.logoInner}>
              <Ionicons name="cube" size={50} color={colors.primary} />
            </View>
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>Logistic</Text>
        <Text style={styles.subtitle}>Smart Delivery Management</Text>
        
        {!hasSeenOnboarding && (
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={handleStart}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>Tap to Enter</Text>
            <Ionicons name="chevron-forward" size={18} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
        )}
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    padding: 20,
    marginBottom: 10,
  },
  content: {
    alignItems: 'center',
    width: width,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 40,
    color: colors.white,
    letterSpacing: 2,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  startButton: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  startButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  versionText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});

export default SplashScreen;
