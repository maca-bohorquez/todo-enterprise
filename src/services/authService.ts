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
    avatar?: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export const authService = {
    async login({ email, password }: LoginCredentials): Promise<User> {
        try {
            console.log('Attempting login with:', { email });
            const { data: users } = await api.get<UserResponse[]>(`/users?email=${email}`);
            console.log('Users found:', users);

            const user = users[0];

            if (!user) {
                console.log('No user found with this email');
                throw new Error('Invalid credentials');
            }

            if (user.password !== password) {
                console.log('Password mismatch');
                throw new Error('Invalid credentials');
            }

            const { password: _, ...userWithoutPassword } = user;
            console.log('Login successful:', userWithoutPassword);

            localStorage.setItem('user', JSON.stringify(userWithoutPassword));

            return userWithoutPassword;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Invalid email or password');
        }
    }
}; 