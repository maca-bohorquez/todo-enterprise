import { todoService } from '@/services/todoService';
import type { Todo, TodoStatus } from '@/types/todo';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TodoStore {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
    filter: TodoStatus | 'all';
    addTodo: (title: string, status: TodoStatus) => void;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    setFilter: (filter: TodoStatus | 'all') => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    fetchTodos: () => Promise<void>;
    addTodoAsync: (title: string, status: TodoStatus) => Promise<void>;
    updateTodoAsync: (id: string, updates: Partial<Todo>) => Promise<void>;
    deleteTodoAsync: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>()(
    devtools((set) => ({
        todos: [],
        isLoading: false,
        error: null,
        filter: 'all',

        addTodo: (title, status) => {
            set((state) => ({
                todos: [
                    ...state.todos,
                    {
                        id: crypto.randomUUID(),
                        title,
                        status,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    },
                ],
            }));
        },

        updateTodo: (id, updates) => {
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id
                        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
                        : todo
                ),
            }));
        },

        deleteTodo: (id) => {
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            }));
        },

        setFilter: (filter) => {
            set({ filter });
        },

        setError: (error) => {
            set({ error });
        },

        setLoading: (isLoading) => {
            set({ isLoading });
        },

        fetchTodos: async () => {
            try {
                set({ isLoading: true, error: null });
                const todos = await todoService.getAllTodos();
                set({ todos, isLoading: false });
            } catch (error) {
                set({
                    error: 'Failed to fetch todos',
                    isLoading: false
                });
            }
        },

        addTodoAsync: async (title, status) => {
            try {
                set({ isLoading: true, error: null });
                const newTodo = await todoService.createTodo({
                    title,
                    status,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                set(state => ({
                    todos: [...state.todos, newTodo],
                    isLoading: false
                }));
            } catch (error) {
                set({
                    error: 'Failed to create todo',
                    isLoading: false
                });
            }
        },

        updateTodoAsync: async (id, updates) => {
            try {
                set({ isLoading: true, error: null });
                const updatedTodo = await todoService.updateTodo(id, updates);
                set(state => ({
                    todos: state.todos.map(todo =>
                        todo.id === id ? updatedTodo : todo
                    ),
                    isLoading: false
                }));
            } catch (error) {
                set({
                    error: 'Failed to update todo',
                    isLoading: false
                });
            }
        },

        deleteTodoAsync: async (id) => {
            try {
                set({ isLoading: true, error: null });
                await todoService.deleteTodo(id);
                set(state => ({
                    todos: state.todos.filter(todo => todo.id !== id),
                    isLoading: false
                }));
            } catch (error) {
                set({
                    error: 'Failed to delete todo',
                    isLoading: false
                });
            }
        }
    }))
); 