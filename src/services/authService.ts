import { api } from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface UserResponse {
    id: string;
    email: string;
    name: string;
    password: string;
}

interface User {
    id: string;
    email: string;
    name: string;
}

export const authService = {
    async login({ email, password }: LoginCredentials): Promise<User> {
        try {
            const { data: users } = await api.get<UserResponse[]>(`/users?email=${email}`);
            const user = users[0];

            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }

            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Invalid email or password');
        }
    }
}; 