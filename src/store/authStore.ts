import { authService } from '@/services/authService';
import { create } from 'zustand';

interface AuthState {
    user: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const user = await authService.login({ email, password });
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false
            });
        }
    },
    clearError: () => set({ error: null })
})); 