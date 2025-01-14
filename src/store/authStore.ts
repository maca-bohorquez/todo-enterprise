import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const DEFAULT_USER = {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'demo123' // En producción, nunca almacenar contraseñas en texto plano
};

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
        user: null,
        isAuthenticated: false,

        login: async (email: string, password: string) => {
            if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
                const { password: _, ...user } = DEFAULT_USER;
                set({ user, isAuthenticated: true });
            } else {
                throw new Error('Invalid credentials');
            }
        },

        logout: () => {
            set({ user: null, isAuthenticated: false });
        },
    }))
); 