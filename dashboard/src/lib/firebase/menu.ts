import { collection, query, where, orderBy, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";
import type { MenuItem } from "@/types";

// ⭐ OUTLET ID - Sesuaikan dengan Flutter app
const OUTLET_ID = "OUTLET_001";

/**
 * Get all menu items
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const menuRef = collection(db, "menu_items");
    const q = query(menuRef, where("outletId", "==", OUTLET_ID), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items:", error);
    throw error;
  }
}

/**
 * Get menu item by ID
 */
export async function getMenuItemById(menuId: string): Promise<MenuItem | null> {
  try {
    const menuDoc = await getDoc(doc(db, "menu_items", menuId));

    if (!menuDoc.exists()) {
      return null;
    }

    return {
      id: menuDoc.id,
      ...menuDoc.data(),
    } as MenuItem;
  } catch (error) {
    console.error("Error getting menu item:", error);
    throw error;
  }
}

/**
 * Add new menu item
 */
export async function addMenuItem(data: Omit<MenuItem, "id">): Promise<string> {
  try {
    const menuRef = collection(db, "menu_items");
    const docRef = await addDoc(menuRef, {
      ...data,
      outletId: OUTLET_ID,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
}

/**
 * Update menu item
 */
export async function updateMenuItem(menuId: string, data: Partial<MenuItem>): Promise<void> {
  try {
    const menuRef = doc(db, "menu_items", menuId);
    await updateDoc(menuRef, data as any);
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
}

/**
 * Toggle menu item availability
 */
export async function toggleMenuAvailability(menuId: string, isAvailable: boolean): Promise<void> {
  try {
    const menuRef = doc(db, "menu_items", menuId);
    await updateDoc(menuRef, { isAvailable });
  } catch (error) {
    console.error("Error toggling availability:", error);
    throw error;
  }
}
