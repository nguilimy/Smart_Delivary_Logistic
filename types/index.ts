export interface Address {
  label: string;
  city: string;
  state: string;
  country: string;
  coordinates: { lat: number; lng: number };
}

export interface TimelineEvent {
  status: string;
  timestamp: string | null;
  completed: boolean;
  current: boolean;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalDeliveries: number;
  verified: boolean;
  phone: string;
  memberSince: string;
}

export interface Shipment {
  id: string;
  type: 'Standard' | 'Express' | 'Fragile' | 'Oversized';
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Pending' | 'Cancelled';
  pickup: Address;
  delivery: Address;
  cargo: {
    description: string;
    type: string;
    weight: number;
    dimensions?: { l: number; w: number; h: number };
    specialInstructions?: string;
  };
  driver?: Driver;
  estimatedDelivery: string;
  totalCost: number;
  progress: number;
  timeline: TimelineEvent[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'driver';
  avatar?: string;
}

export interface DashboardStats {
  totalShipments: number;
  totalShipmentsChange: number;
  inTransit: number;
  inTransitChange: number;
  delivered: number;
  deliveredChange: number;
  weeklyData: number[];
}

export type ShipmentType = 'Standard' | 'Express' | 'Fragile' | 'Oversized';
export type CargoType = 'Electronics' | 'Furniture' | 'Food' | 'Documents' | 'General';
export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Delayed' | 'Pending' | 'Cancelled';
