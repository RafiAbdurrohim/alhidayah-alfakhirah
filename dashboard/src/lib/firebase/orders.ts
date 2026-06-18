import { collection, query, where, orderBy, getDocs, getDoc, doc, updateDoc, Timestamp, onSnapshot, limit, startAfter, Query, DocumentData } from "firebase/firestore";
import { db } from "./config";
import type { Order, OrderStatus } from "@/types";

// ⭐ OUTLET ID - Sesuaikan dengan Flutter app
const OUTLET_ID = "OUTLET_001";

/**
 * Get all orders with optional filters
 */
const serviceCollections = {
  food: "orders",
  tours: "tour_orders",
  cargo: "cargo_orders",
  massage: "massage_orders",
  beauty: "beauty_orders",
  shopping: "shop_orders",
};

/**
 * Get all orders with optional filters
 */
export async function getOrders(filters?: { 
  service?: 'food' | 'tours' | 'cargo' | 'massage' | 'beauty' | 'shopping';
  status?: OrderStatus; 
  startDate?: Date; 
  endDate?: Date; 
  customerId?: string; 
  driverId?: string;
}): Promise<Order[]> {
  try {
    const serviceKey = filters?.service || "food";
    const colName = serviceCollections[serviceKey] || "orders";
    const ordersRef = collection(db, colName);
    
    let q: Query<DocumentData>;
    if (serviceKey === "food") {
      q = query(ordersRef, where("outletId", "==", OUTLET_ID));
    } else {
      q = query(ordersRef);
    }

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
    if (filters?.driverId && serviceKey === "food") {
      q = query(q, where("assignedDriverId", "==", filters.driverId));
    }

    // Order by created date (newest first)
    q = query(q, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    const orders: Order[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      let items: any[] = [];

      if (serviceKey === "food") {
        const itemsSnapshot = await getDocs(collection(db, "orders", docSnap.id, "items"));
        items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data() as any);
      } else if (serviceKey === "shopping" && data.items) {
        items = data.items.map((it: any) => ({
          menuId: it.productId || "product",
          name: it.productName || "Product",
          price: it.price || 0,
          quantity: it.quantity || 1,
          subtotal: it.subtotal || 0,
        }));
      } else if (serviceKey === "beauty" && data.items) {
        items = data.items.map((it: any) => ({
          menuId: it.serviceId || "beauty",
          name: it.serviceName || "Service",
          price: it.price || 0,
          quantity: 1,
          subtotal: it.price || 0,
        }));
      } else if (serviceKey === "tours") {
        items = [{
          menuId: data.packageId || "tour",
          name: data.packageName || "Tour Package",
          price: data.total || 0,
          quantity: data.passengers || 1,
          subtotal: data.total || 0,
        }];
      } else if (serviceKey === "cargo") {
        items = [{
          menuId: "cargo",
          name: `Cargo: ${data.itemDescription || "Paket"}`,
          price: data.price || 0,
          quantity: 1,
          subtotal: data.price || 0,
        }];
      } else if (serviceKey === "massage") {
        items = [{
          menuId: "massage",
          name: `Massage: ${data.serviceType === 'massage' ? 'Go Massage' : 'Go Therapy'} (${data.duration} m)`,
          price: data.price || 0,
          quantity: data.participants || 1,
          subtotal: data.price || 0,
        }];
      }

      const orderTotal = serviceKey === "cargo"
          ? (data.price || 0)
          : serviceKey === "shopping"
          ? (data.finalTotal || data.estimatedTotal || 0)
          : serviceKey === "beauty"
          ? (data.finalPrice || data.total || 0)
          : (data.total || 0);

      const orderAddress = serviceKey === "shopping"
          ? (data.deliveryAddress || "")
          : serviceKey === "cargo"
          ? (data.recipientAddress || "")
          : (data.pickupAddress || data.address || "");

      orders.push({
        id: docSnap.id,
        userId: data.userId || "",
        customerName: data.customerName || "Customer",
        customerPhone: data.customerPhone || "",
        status: data.status || "NEW",
        subtotal: data.subtotal || data.total || orderTotal,
        deliveryFee: data.deliveryFee || 0,
        discount: data.discount || 0,
        total: orderTotal,
        address: orderAddress,
        note: data.note || "",
        latitude: data.latitude != null ? Number(data.latitude) : undefined,
        longitude: data.longitude != null ? Number(data.longitude) : undefined,
        assignedDriverId: data.assignedDriverId,
        assignedDriverName: data.assignedDriverName,
        driverStatus: data.driverStatus,
        items,
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        outletId: data.outletId || OUTLET_ID,
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
export async function getOrderById(orderId: string, service: string = "food"): Promise<Order | null> {
  try {
    const colName = serviceCollections[service as keyof typeof serviceCollections] || "orders";
    const orderDoc = await getDoc(doc(db, colName, orderId));

    if (!orderDoc.exists()) {
      return null;
    }

    const data = orderDoc.data();
    let items: any[] = [];

    if (service === "food") {
      const itemsSnapshot = await getDocs(collection(db, "orders", orderId, "items"));
      items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data() as any);
    } else if (service === "shopping" && data.items) {
      items = data.items.map((it: any) => ({
        menuId: it.productId || "product",
        name: it.productName || "Product",
        price: it.price || 0,
        quantity: it.quantity || 1,
        subtotal: it.subtotal || 0,
      }));
    } else if (service === "beauty" && data.items) {
      items = data.items.map((it: any) => ({
        menuId: it.serviceId || "beauty",
        name: it.serviceName || "Service",
        price: it.price || 0,
        quantity: 1,
        subtotal: it.price || 0,
      }));
    } else if (service === "tours") {
      items = [{
        menuId: data.packageId || "tour",
        name: data.packageName || "Tour Package",
        price: data.total || 0,
        quantity: data.passengers || 1,
        subtotal: data.total || 0,
      }];
    } else if (service === "cargo") {
      items = [{
        menuId: "cargo",
        name: `Cargo: ${data.itemDescription || "Paket"}`,
        price: data.price || 0,
        quantity: 1,
        subtotal: data.price || 0,
      }];
    } else if (service === "massage") {
      items = [{
        menuId: "massage",
        name: `Massage: ${data.serviceType === 'massage' ? 'Go Massage' : 'Go Therapy'} (${data.duration} m)`,
        price: data.price || 0,
        quantity: data.participants || 1,
        subtotal: data.price || 0,
      }];
    }

    const orderTotal = service === "cargo"
        ? (data.price || 0)
        : service === "shopping"
        ? (data.finalTotal || data.estimatedTotal || 0)
        : service === "beauty"
        ? (data.finalPrice || data.total || 0)
        : (data.total || 0);

    const orderAddress = service === "shopping"
        ? (data.deliveryAddress || "")
        : service === "cargo"
        ? (data.recipientAddress || "")
        : (data.pickupAddress || data.address || "");

    return {
      id: orderDoc.id,
      userId: data.userId || "",
      customerName: data.customerName || "Customer",
      customerPhone: data.customerPhone || "",
      status: data.status || "NEW",
      subtotal: data.subtotal || data.total || orderTotal,
      deliveryFee: data.deliveryFee || 0,
      discount: data.discount || 0,
      total: orderTotal,
      address: orderAddress,
      note: data.note || "",
      latitude: data.latitude != null ? Number(data.latitude) : undefined,
      longitude: data.longitude != null ? Number(data.longitude) : undefined,
      assignedDriverId: data.assignedDriverId,
      assignedDriverName: data.assignedDriverName,
      driverStatus: data.driverStatus,
      items,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: data.updatedAt || Timestamp.now(),
      outletId: data.outletId || OUTLET_ID,
    } as Order;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus, service: string = "food"): Promise<void> {
  try {
    const colName = serviceCollections[service as keyof typeof serviceCollections] || "orders";
    const orderRef = doc(db, colName, orderId);
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
