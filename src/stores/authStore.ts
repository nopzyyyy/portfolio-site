import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: async (username: string, password: string) => {
        // Simple authentication for demo purposes
        // In a real app, this would call an API endpoint
        if (username === 'admin' && password === 'password') {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);