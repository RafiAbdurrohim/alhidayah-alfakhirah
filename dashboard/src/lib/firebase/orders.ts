import { collection, query, where, orderBy, getDocs, getDoc, doc, updateDoc, Timestamp, onSnapshot, limit, startAfter, Query, DocumentData } from "firebase/firestore";
import { db } from "./config";
import type { Order, OrderStatus } from "@/types";

// ⭐ OUTLET ID - Sesuaikan dengan Flutter app
const OUTLET_ID = "OUTLET_001";

/**
 * Get all orders with optional filters
 */
export async function getOrders(filters?: { status?: OrderStatus; startDate?: Date; endDate?: Date; customerId?: string; driverId?: string }): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    let q: Query<DocumentData> = query(ordersRef, where("outletId", "==", OUTLET_ID));

    // Apply filters
    if (filters?.status) {
      q = query(q, where("status", "==", filters.status));
    }
    if (filters?.startDate) {
      q = query(q, where("createdAt", ">=", Timestamp.fromDate(filters.startDate)));
    }
    if (filters?.endDate) {
      q = query(q, where("createdAt", "<=", Timestamp.fromDate(filters.endDate)));
    }
    if (filters?.customerId) {
      q = query(q, where("userId", "==", filters.customerId));
    }
    if (filters?.driverId) {
      q = query(q, where("assignedDriverId", "==", filters.driverId));
    }

    // Order by created date (newest first)
    q = query(q, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    const orders: Order[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // Get order items from subcollection
      const itemsSnapshot = await getDocs(collection(db, "orders", docSnap.id, "items"));
      const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data() as any);

      orders.push({
        id: docSnap.id,
        ...data,
        items,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as Order);
    }

    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

/**
 * Get single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));

    if (!orderDoc.exists()) {
      return null;
    }

    const data = orderDoc.data();

    // Get order items
    const itemsSnapshot = await getDocs(collection(db, "orders", orderId, "items"));
    const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data() as any);

    return {
      id: orderDoc.id,
      ...data,
      items,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as Order;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/**
 * Assign driver to order
 */
export async function assignDriverToOrder(orderId: string, driverId: string, driverName: string): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      assignedDriverId: driverId,
      assignedDriverName: driverName,
      status: "ASSIGNED" as OrderStatus,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error assigning driver:", error);
    throw error;
  }
}

/**
 * Get today's orders count and revenue
 */
export async function getTodayStats(): Promise<{
  ordersCount: number;
  revenue: number;
}> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("outletId", "==", OUTLET_ID), where("createdAt", ">=", Timestamp.fromDate(today)), where("status", "!=", "CANCELLED"));

    const snapshot = await getDocs(q);

    let revenue = 0;
    snapshot.forEach((doc) => {
      const data = doc.data();
      revenue += data.total || 0;
    });

    return {
      ordersCount: snapshot.size,
      revenue,
    };
  } catch (error) {
    console.error("Error getting today stats:", error);
    return { ordersCount: 0, revenue: 0 };
  }
}

/**
 * Listen to orders real-time
 */
export function subscribeToOrders(callback: (orders: Order[]) => void, filters?: { status?: OrderStatus }) {
  const ordersRef = collection(db, "orders");
  let q: Query<DocumentData> = query(ordersRef, where("outletId", "==", OUTLET_ID));

  if (filters?.status) {
    q = query(q, where("status", "==", filters.status));
  }

  q = query(q, orderBy("createdAt", "desc"), limit(50));

  return onSnapshot(q, async (snapshot) => {
    const orders: Order[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // Get items
      const itemsSnapshot = await getDocs(collection(db, "orders", docSnap.id, "items"));
      const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data() as any);

      orders.push({
        id: docSnap.id,
        ...data,
        items,
      } as Order);
    }

    callback(orders);
  });
}
