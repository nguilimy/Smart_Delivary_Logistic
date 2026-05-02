import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useThemeColors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const themeColors = useThemeColors();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: `${themeColors.primary}CC`, // 80% opacity for glass effect
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.4)',
          shadowColor: themeColors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 15,
          elevation: 8,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: themeColors.border,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'glass':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        };
      default:
        return {};
    }
  };

  const buttonStyles = [
    styles.base,
    getVariantStyles(),
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const getLabelStyle = () => {
    switch (variant) {
      case 'primary': return { color: '#FFFFFF' };
      case 'outline': return { color: themeColors.text };
      case 'ghost': return { color: themeColors.primary };
      case 'glass': return { color: themeColors.text };
      default: return {};
    }
  };

  const labelStyles = [
    styles.label,
    getLabelStyle(),
    styles[`labelSize_${size}`],
    disabled && styles.labelDisabled,
    textStyle,
  ];

  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'glass' ? themeColors.primary : '#FFFFFF'}
          size="small"
        />
      ) : (
        <View style={styles.innerContent}>
          {icon}
          <Text style={labelStyles}>{title}</Text>
        </View>
      )}
    </>
  );

  if (variant === 'primary' || variant === 'glass') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[buttonStyles, { overflow: 'hidden' }]}
      >
        <BlurView intensity={variant === 'primary' ? 40 : 30} tint="light" style={StyleSheet.absoluteFill} />
        <ButtonContent />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  size_sm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  size_md: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  size_lg: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: fonts.bold,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  labelSize_sm: {
    fontSize: 13,
  },
  labelSize_md: {
    fontSize: 16,
  },
  labelSize_lg: {
    fontSize: 18,
  },
  labelDisabled: {
    opacity: 0.7,
  },
});
