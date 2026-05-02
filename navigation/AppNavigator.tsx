import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { colors, useThemeColors } from '../constants/colors';
import { fonts } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ShipmentsScreen from '../screens/shipments/ShipmentsScreen';
import ShipmentDetailScreen from '../screens/shipments/ShipmentDetailScreen';
import LiveTrackingScreen from '../screens/tracking/LiveTrackingScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import VehiclesScreen from '../screens/vehicles/VehiclesScreen';
import AlertsScreen from '../screens/alerts/AlertsScreen';
import CreateShipmentStep1 from '../screens/shipment/CreateShipmentStep1';
import CreateShipmentStep2 from '../screens/shipment/CreateShipmentStep2';
import ReviewConfirmScreen from '../screens/shipment/ReviewConfirmScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShipmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ShipmentsList" component={ShipmentsScreen} />
    <Stack.Screen name="ShipmentDetail" component={ShipmentDetailScreen} />
    <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Placeholder" component={require('../screens/profile/PlaceholderScreen').default} />
  </Stack.Navigator>
);

const CreateShipmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CreateShipmentStep1" component={CreateShipmentStep1} />
    <Stack.Screen name="CreateShipmentStep2" component={CreateShipmentStep2} />
    <Stack.Screen name="ReviewConfirm" component={ReviewConfirmScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const themeColors = useThemeColors();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (focused) {
            if (route.name === 'Dashboard') iconName = 'grid';
            else if (route.name === 'Shipments') iconName = 'cube';
            else if (route.name === 'Vehicles') iconName = 'car';
            else if (route.name === 'Alerts') iconName = 'notifications';
            else if (route.name === 'Profile') iconName = 'person';
          } else {
            if (route.name === 'Dashboard') iconName = 'grid-outline';
            else if (route.name === 'Shipments') iconName = 'cube-outline';
            else if (route.name === 'Vehicles') iconName = 'car-outline';
            else if (route.name === 'Alerts') iconName = 'notifications-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textMuted,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          height: 64,
          borderRadius: 32,
          backgroundColor: themeColors.white + 'CC',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: themeColors.white + '30',
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          paddingBottom: 0,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint={themeColors.surface === '#F7F7F7' ? "light" : "dark"} 
            style={{ 
              ...StyleSheet.absoluteFillObject,
              borderRadius: 32,
              overflow: 'hidden',
            }} 
          />
        ),
        tabBarLabelStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 10,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 4,
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Shipments" component={ShipmentStack} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const MainAppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen 
      name="CreateShipment" 
      component={CreateShipmentStack} 
      options={{ presentation: 'modal' }}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { isAuthenticated, hasSeenOnboarding, settings } = useAppStore();
  const systemColorScheme = useColorScheme();
  
  const isDark = settings?.theme === 'Dark' || (settings?.theme === 'System' && systemColorScheme === 'dark');

  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator 
        initialRouteName={isAuthenticated ? "App" : (!hasSeenOnboarding ? "Splash" : "Auth")}
        screenOptions={{ headerShown: false }}
      >
        {!hasSeenOnboarding && (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
        
        {isAuthenticated ? (
          <Stack.Screen name="App" component={MainAppStack} />
        ) : (
          hasSeenOnboarding && <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
