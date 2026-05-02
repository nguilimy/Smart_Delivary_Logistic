import { colors } from '../constants/colors';

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Delivered':
      return colors.success;
    case 'In Transit':
      return colors.warning;
    case 'Delayed':
      return colors.danger;
    case 'Pending':
      return colors.info;
    case 'Cancelled':
      return colors.textMuted;
    default:
      return colors.textSecondary;
  }
};

export const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'Delivered':
      return '#E8F8F0';
    case 'In Transit':
      return '#FFF5E6';
    case 'Delayed':
      return '#FFEAEA';
    case 'Pending':
      return '#E8F0FE';
    case 'Cancelled':
      return '#F0F0F0';
    default:
      return colors.surface;
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return colors.success;
  if (progress >= 40) return colors.warning;
  return colors.danger;
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
