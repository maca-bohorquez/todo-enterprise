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
                        updatedAt: new Date().toISOString(),
                        userId: '1',
                        labels: []
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
    }))
);

export const selectFilteredTodos = (state: TodoStore) => {
    const { todos, filter } = state;
    if (filter === 'all') return todos;
    return todos.filter(todo => todo.status === filter);
}; 