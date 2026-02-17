import { collection, query, where, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";
import type { Promo } from "@/types";

// ⭐ OUTLET ID - Sesuaikan dengan Flutter app
const OUTLET_ID = "OUTLET_001";

/**
 * Get all promos
 */
export async function getPromos(filters?: { isActive?: boolean }): Promise<Promo[]> {
  try {
    const promosRef = collection(db, "promos");
    let q = query(promosRef, where("outletId", "==", OUTLET_ID));

    if (filters?.isActive !== undefined) {
      q = query(promosRef, where("outletId", "==", OUTLET_ID), where("isActive", "==", filters.isActive));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Promo[];
  } catch (error) {
    console.error("Error getting promos:", error);
    throw error;
  }
}

/**
 * Get promo by ID
 */
export async function getPromoById(promoId: string): Promise<Promo | null> {
  try {
    const promoDoc = await getDoc(doc(db, "promos", promoId));

    if (!promoDoc.exists()) {
      return null;
    }

    return {
      id: promoDoc.id,
      ...promoDoc.data(),
    } as Promo;
  } catch (error) {
    console.error("Error getting promo:", error);
    throw error;
  }
}

/**
 * Add new promo
 */
export async function addPromo(data: Omit<Promo, "id">): Promise<string> {
  try {
    const promosRef = collection(db, "promos");
    const docRef = await addDoc(promosRef, {
      ...data,
      outletId: OUTLET_ID,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding promo:", error);
    throw error;
  }
}

/**
 * Update promo
 */
export async function updatePromo(promoId: string, data: Partial<Promo>): Promise<void> {
  try {
    const promoRef = doc(db, "promos", promoId);
    await updateDoc(promoRef, data as any);
  } catch (error) {
    console.error("Error updating promo:", error);
    throw error;
  }
}

/**
 * Toggle promo active status
 */
export async function togglePromoStatus(promoId: string, isActive: boolean): Promise<void> {
  try {
    const promoRef = doc(db, "promos", promoId);
    await updateDoc(promoRef, { isActive });
  } catch (error) {
    console.error("Error toggling promo status:", error);
    throw error;
  }
}

/**
 * Delete promo
 */
export async function deletePromo(promoId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "promos", promoId));
  } catch (error) {
    console.error("Error deleting promo:", error);
    throw error;
  }
}
