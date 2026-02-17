import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CUSTOMER' | 'DRIVER';
  phone?: string;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data();

    // Check if user is SUPER_ADMIN
    if (userData.role !== 'SUPER_ADMIN') {
      await firebaseSignOut(auth);
      throw new Error('Unauthorized: Only Super Admin can access this dashboard');
    }

    return {
      uid: user.uid,
      email: user.email || '',
      name: userData.name || '',
      role: userData.role,
      phone: userData.phone,
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      
      if (!user) {
        resolve(null);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          resolve(null);
          return;
        }

        const userData = userDoc.data();

        if (userData.role !== 'SUPER_ADMIN') {
          await firebaseSignOut(auth);
          resolve(null);
          return;
        }

        resolve({
          uid: user.uid,
          email: user.email || '',
          name: userData.name || '',
          role: userData.role,
          phone: userData.phone,
        });
      } catch (error) {
        console.error('Get current user error:', error);
        resolve(null);
      }
    });
  });
}

/**
 * Check if user is authenticated
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
