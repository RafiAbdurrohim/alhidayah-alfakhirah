import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  getDoc,
  doc,
  limit
} from 'firebase/firestore';
import { db } from './config';
import type { User } from '@/types';

/**
 * Get all customers
 */
export async function getCustomers(): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('role', '==', 'CUSTOMER'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
}

/**
 * Get customer by ID
 */
export async function getCustomerById(customerId: string): Promise<User | null> {
  try {
    const customerDoc = await getDoc(doc(db, 'users', customerId));
    
    if (!customerDoc.exists()) {
      return null;
    }

    return {
      uid: customerDoc.id,
      ...customerDoc.data(),
    } as User;
  } catch (error) {
    console.error('Error getting customer:', error);
    throw error;
  }
}

/**
 * Get customer orders
 */
export async function getCustomerOrders(customerId: string) {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', customerId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting customer orders:', error);
    return [];
  }
}