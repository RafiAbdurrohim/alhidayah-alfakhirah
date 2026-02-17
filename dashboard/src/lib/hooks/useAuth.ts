import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signIn as firebaseSignIn, signOut as firebaseSignOut, getCurrentUser } from '@/lib/firebase/auth';
import type { AuthUser } from '@/lib/firebase/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const user = await firebaseSignIn(email, password);
          set({ user, loading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sign in', 
            loading: false 
          });
          throw error;
        }
      },

      signOut: async () => {
        set({ loading: true });
        try {
          await firebaseSignOut();
          set({ user: null, loading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sign out', 
            loading: false 
          });
        }
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const user = await getCurrentUser();
          set({ user, loading: false });
        } catch (error) {
          set({ user: null, loading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user
    }
  )
);
