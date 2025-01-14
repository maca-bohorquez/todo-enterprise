import { authService } from '@/services/authService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
            try {
                set({ isLoading: true, error: null });
                const user = await authService.login({ email, password });
                set({ user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                set({
                    error: 'Invalid email or password',
                    isLoading: false,
                    isAuthenticated: false,
                    user: null
                });
            }
        },

        logout: () => {
            set({ user: null, isAuthenticated: false });
        },

        clearError: () => {
            set({ error: null });
        }
    }))
); 