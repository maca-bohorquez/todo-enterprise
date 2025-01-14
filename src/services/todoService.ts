import type { Todo } from '@/types/todo';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const todoService = {
    async getAllTodos(): Promise<Todo[]> {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    },

    async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
        const response = await axios.post(`${API_URL}/todos`, todo);
        return response.data;
    },

    async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
        const response = await axios.patch(`${API_URL}/todos/${id}`, updates);
        return response.data;
    },

    async deleteTodo(id: string): Promise<void> {
        await axios.delete(`${API_URL}/todos/${id}`);
    }
}; 