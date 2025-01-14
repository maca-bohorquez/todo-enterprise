import { Todo } from '@/types/todo';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
}

export const api = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        try {
            const { data: users } = await axios.get(`${API_URL}/users`);
            const user = users.find(
                (u: User) => u.email === credentials.email && u.password === credentials.password
            );

            if (!user) {
                throw new Error('Invalid credentials');
            }

            return user;
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    throw new Error('Cannot connect to server. Please make sure json-server is running.');
                }
            }
            throw new Error('Invalid credentials');
        }
    },

    getTodos: async (userId: string): Promise<Todo[]> => {
        try {
            const { data } = await axios.get(`${API_URL}/todos?userId=${userId}`);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message ||
                    'Error connecting to the server. Please make sure json-server is running.'
                );
            }
            throw error;
        }
    },

    createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
        console.log('Creating todo:', todo);
        const { data } = await axios.post(`${API_URL}/todos`, {
            ...todo,
            id: crypto.randomUUID()
        });
        console.log('Created todo:', data);
        return data;
    },

    updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
        const { data } = await axios.patch(`${API_URL}/todos/${id}`, updates);
        return data;
    },

    deleteTodo: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/todos/${id}`);
    }
}; 