import { useAppStore } from '../store/useAppStore';

export const lightColors = {
  primary: '#E8232A',
  primaryDark: '#B01A20',
  primaryLight: '#FFEAEA',
  white: '#FFFFFF',
  surface: '#F7F7F7',
  border: 'rgba(0,0,0,0.08)',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textMuted: '#999999',
  success: '#1DB97A',
  warning: '#F5A623',
  info: '#1A73E8',
  danger: '#E8232A',
};

export const darkColors = {
  primary: '#E8232A',
  primaryDark: '#B01A20',
  primaryLight: '#3A1A1A',
  white: '#121212',
  surface: '#1E1E1E',
  border: 'rgba(255,255,255,0.08)',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#888888',
  success: '#1DB97A',
  warning: '#F5A623',
  info: '#1A73E8',
  danger: '#E8232A',
};

export const accentColorMap: Record<string, { primary: string; primaryDark: string; primaryLight: string }> = {
  Red: { primary: '#E8232A', primaryDark: '#B01A20', primaryLight: '#FFEAEA' },
  Orange: { primary: '#FF6B00', primaryDark: '#CC5500', primaryLight: '#FFF0E6' },
  Cyan: { primary: '#00B4D8', primaryDark: '#0077B6', primaryLight: '#E0FBFC' },
  Gray: { primary: '#6C757D', primaryDark: '#495057', primaryLight: '#F8F9FA' },
  Purple: { primary: '#8338EC', primaryDark: '#5E2CA5', primaryLight: '#F2E8FF' },
  Blue: { primary: '#3A86FF', primaryDark: '#2B63BC', primaryLight: '#E8F1FF' },
  Black: { primary: '#212529', primaryDark: '#000000', primaryLight: '#E9ECEF' },
};

// Fallback static colors for default usage where hooks cannot be used
export const colors = lightColors;

export const useThemeColors = () => {
  const theme = useAppStore((state) => state.settings?.theme) || 'Light';
  const accentColorName = useAppStore((state) => state.settings?.accentColor) || 'Red';
  
  const basePalette = theme === 'Dark' ? darkColors : lightColors;
  const accentPalette = accentColorMap[accentColorName] || accentColorMap.Red;
  
  return {
    ...basePalette,
    primary: accentPalette.primary,
    primaryDark: accentPalette.primaryDark,
    primaryLight: theme === 'Dark' ? accentPalette.primaryDark + '40' : accentPalette.primaryLight,
  };
};
