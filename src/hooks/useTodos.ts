import { Todo } from '@/types/todo';
import { useState } from 'react';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([
        // { id: '1', title: 'Sample Task', status: 'TODO', labels: [], userId: '1' }
    ]);

    const addTodo = (todo: Todo) => {
        setTodos((prev) => [...prev, { ...todo, id: String(prev.length + 1) }]); // Generar un ID simple
    };

    const updateTodo = (id: string, updates: Partial<Todo>) => {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return { todos, addTodo, updateTodo, deleteTodo };
}; 