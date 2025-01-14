import { Todo } from '@/types/todo';
import React from 'react';
import './TodoCard.css';

interface TodoCardProps {
    todo: Todo;
    onEdit: (id: string, updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    const handleEdit = () => {
        // Logic to handle editing the todo
        onEdit(todo.id, { /* updates */ });
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    return (
        <div className="todo-card">
            <h3>{todo.title}</h3>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}; 