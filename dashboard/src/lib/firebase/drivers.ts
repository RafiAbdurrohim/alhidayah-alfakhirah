import { collection, query, where, orderBy, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";
import type { Driver, DriverStatus } from "@/types";

// ⭐ OUTLET ID - Sesuaikan dengan Flutter app
const OUTLET_ID = "OUTLET_001";

/**
 * Get all drivers
 */
export async function getDrivers(filters?: { status?: DriverStatus }): Promise<Driver[]> {
  try {
    const driversRef = collection(db, "drivers");
    let q = query(driversRef, where("outletId", "==", OUTLET_ID), orderBy("createdAt", "desc"));

    if (filters?.status) {
      q = query(driversRef, where("outletId", "==", OUTLET_ID), where("status", "==", filters.status));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Driver[];
  } catch (error) {
    console.error("Error getting drivers:", error);
    throw error;
  }
}

/**
 * Get single driver by ID
 */
export async function getDriverById(driverId: string): Promise<Driver | null> {
  try {
    const driverDoc = await getDoc(doc(db, "drivers", driverId));

    if (!driverDoc.exists()) {
      return null;
    }

    return {
      id: driverDoc.id,
      ...driverDoc.data(),
    } as Driver;
  } catch (error) {
    console.error("Error getting driver:", error);
    throw error;
  }
}

/**
 * Get active drivers count
 */
export async function getActiveDriversCount(): Promise<{
  active: number;
  total: number;
}> {
  try {
    const driversRef = collection(db, "drivers");

    // Get all drivers for this outlet
    const allQuery = query(driversRef, where("outletId", "==", OUTLET_ID));
    const allSnapshot = await getDocs(allQuery);

    // Get active drivers
    const activeQuery = query(driversRef, where("outletId", "==", OUTLET_ID), where("status", "==", "AVAILABLE"));
    const activeSnapshot = await getDocs(activeQuery);

    return {
      active: activeSnapshot.size,
      total: allSnapshot.size,
    };
  } catch (error) {
    console.error("Error getting active drivers:", error);
    return { active: 0, total: 0 };
  }
}

/**
 * Update driver status
 */
export async function updateDriverStatus(driverId: string, status: DriverStatus): Promise<void> {
  try {
    const driverRef = doc(db, "drivers", driverId);
    await updateDoc(driverRef, { status });
  } catch (error) {
    console.error("Error updating driver status:", error);
    throw error;
  }
}

/**
 * Update driver info
 */
export async function updateDriver(driverId: string, data: Partial<Driver>): Promise<void> {
  try {
    const driverRef = doc(db, "drivers", driverId);
    await updateDoc(driverRef, data as any);
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
}

/**
 * Get driver performance stats
 */
export async function getDriverStats(driverId: string) {
  try {
    const driver = await getDriverById(driverId);

    if (!driver) {
      return null;
    }

    // Get driver's orders
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("outletId", "==", OUTLET_ID), where("assignedDriverId", "==", driverId), where("status", "==", "DELIVERED"));

    const snapshot = await getDocs(q);

    return {
      totalDeliveries: driver.totalDeliveries || 0,
      monthlyDeliveries: driver.monthlyDeliveries || 0,
      rating: driver.rating || 0,
      earnings: driver.currentMonthEarnings || { total: 0 },
      recentOrders: snapshot.size,
    };
  } catch (error) {
    console.error("Error getting driver stats:", error);
    return null;
  }
}
