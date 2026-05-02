import { create } from 'zustand';
import { Shipment, User, DashboardStats } from '../types';
import { shipments as mockShipments, currentUser, dashboardStats } from '../data/mockData';

interface CreateShipmentData {
  shipmentType: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  weight: string;
  cargoDescription: string;
  length: string;
  width: string;
  height: string;
  specialInstructions: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;

  // Shipments
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  setSelectedShipment: (shipment: Shipment) => void;

  // Create Shipment
  createShipmentData: CreateShipmentData;
  updateCreateShipmentData: (data: Partial<CreateShipmentData>) => void;
  resetCreateShipmentData: () => void;
  submitShipment: () => void;

  // Dashboard
  dashboardStats: DashboardStats;

  // Settings
  settings: {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    shipmentUpdates: boolean;
    promotionalOffers: boolean;
    biometricLogin: boolean;
    twoFactorAuth: boolean;
    language: string;
    theme: string;
    accentColor: string;
  };
  toggleSetting: (key: string) => void;
  setSetting: (key: string, value: string | boolean) => void;

  // Onboarding
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (seen: boolean) => void;
  updateUser: (data: Partial<User>) => void;
}

const initialCreateShipmentData: CreateShipmentData = {
  shipmentType: '',
  pickupLocation: '',
  deliveryLocation: '',
  cargoType: '',
  weight: '',
  cargoDescription: '',
  length: '',
  width: '',
  height: '',
  specialInstructions: '',
};

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  isAuthenticated: false,
  user: null,
  login: (_email: string, _password: string) => {
    set({ isAuthenticated: true, user: currentUser, hasSeenOnboarding: true });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, hasSeenOnboarding: false });
  },

  // Shipments
  shipments: mockShipments,
  selectedShipment: null,
  setSelectedShipment: (shipment: Shipment) => {
    set({ selectedShipment: shipment });
  },

  // Create Shipment
  createShipmentData: initialCreateShipmentData,
  updateCreateShipmentData: (data: Partial<CreateShipmentData>) => {
    set((state) => ({
      createShipmentData: { ...state.createShipmentData, ...data },
    }));
  },
  resetCreateShipmentData: () => {
    set({ createShipmentData: initialCreateShipmentData });
  },
  submitShipment: () => {
    const { createShipmentData, shipments } = get();
    const newShipment: Shipment = {
      id: `SHP-2024-${String(shipments.length + 123).padStart(5, '0')}`,
      type: (createShipmentData.shipmentType || 'Standard') as Shipment['type'],
      status: 'Pending',
      pickup: {
        label: createShipmentData.pickupLocation,
        city: createShipmentData.pickupLocation.split(',')[0] || 'Unknown',
        state: '',
        country: 'USA',
        coordinates: { lat: 40.7128, lng: -74.006 },
      },
      delivery: {
        label: createShipmentData.deliveryLocation,
        city: createShipmentData.deliveryLocation.split(',')[0] || 'Unknown',
        state: '',
        country: 'USA',
        coordinates: { lat: 34.0522, lng: -118.2437 },
      },
      cargo: {
        description: createShipmentData.cargoDescription,
        type: createShipmentData.cargoType || 'General',
        weight: parseFloat(createShipmentData.weight) || 0,
        dimensions: {
          l: parseFloat(createShipmentData.length) || 0,
          w: parseFloat(createShipmentData.width) || 0,
          h: parseFloat(createShipmentData.height) || 0,
        },
        specialInstructions: createShipmentData.specialInstructions,
      },
      estimatedDelivery: 'Jun 15, 2024',
      totalCost: 285.9,
      progress: 0,
      timeline: [
        { status: 'Order Confirmed', timestamp: new Date().toLocaleString(), completed: true, current: true },
        { status: 'Picked Up', timestamp: null, completed: false, current: false },
        { status: 'In Transit', timestamp: null, completed: false, current: false },
        { status: 'Out for Delivery', timestamp: null, completed: false, current: false },
        { status: 'Delivered', timestamp: null, completed: false, current: false },
      ],
    };
    set({
      shipments: [newShipment, ...shipments],
      createShipmentData: initialCreateShipmentData,
    });
  },

  // Dashboard
  dashboardStats,

  // Settings
  settings: {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    shipmentUpdates: true,
    promotionalOffers: false,
    biometricLogin: true,
    twoFactorAuth: true,
    language: 'English',
    theme: 'Light',
    accentColor: 'Red',
  },
  toggleSetting: (key: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: !state.settings[key as keyof typeof state.settings],
      },
    }));
  },
  setSetting: (key: string, value: string | boolean) => {
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    }));
  },

  // Onboarding
  hasSeenOnboarding: false,
  setHasSeenOnboarding: (seen: boolean) => {
    set({ hasSeenOnboarding: seen });
  },
  updateUser: (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
