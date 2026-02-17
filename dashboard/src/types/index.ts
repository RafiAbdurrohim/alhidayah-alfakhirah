import { Timestamp } from "firebase/firestore";

// User types
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "DRIVER";

export interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: Timestamp;
  isActive?: boolean;
  outletId?: string;
}

// Order types
export type OrderStatus = "NEW" | "PROCESSING" | "ACCEPTED" | "PICKED_UP" | "ON_THE_WAY" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: string;
  note?: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  driverStatus?: string;
  items: OrderItem[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  outletId: string;
}

// Driver types
export type DriverStatus = "AVAILABLE" | "BUSY" | "OFFLINE";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicleNumber: string;
  photo?: string;
  status: DriverStatus;
  rating: number;
  totalDeliveries: number;
  monthlyDeliveries: number;
  currentMonthEarnings: {
    baseBonus: number;
    incentiveBonus: number;
    total: number;
  };
  fcmToken?: string;
  outletId: string;
  createdAt: Timestamp;
}

// Menu types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  outletId: string;
  createdAt: Timestamp;
}

// Promo types
export type PromoType = "PERCENT" | "FIXED" | "FREE_DELIVERY";

export interface Promo {
  id: string;
  title: string;
  description?: string; // ⭐ OPTIONAL
  type: PromoType;
  value: number;
  minSubtotal: number;
  maxDiscount: number;
  isActive: boolean;
  outletId: string;
  createdAt?: Timestamp; // ⭐ OPTIONAL
}

// Review types
export interface Review {
  id: string;
  menuId: string;
  userId: string;
  userName: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

// Dashboard stats
export interface DashboardStats {
  todayOrders: number;
  todayRevenue: number;
  activeDrivers: number;
  totalOrders: number;
  ordersByStatus: {
    new: number;
    processing: number;
    delivered: number;
    cancelled: number;
  };
}
