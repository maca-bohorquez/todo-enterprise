import type { Todo } from '@/types/todo';
import React from 'react';
import './TodoCard.css';

interface TodoCardProps {
    todo: Todo;
    onEdit: (id: string, updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    return (
        <div className="todo-card">
            <h3>{todo.title}</h3>
            {todo.description && <p>{todo.description}</p>}
            <div className="todo-actions">
                <button onClick={() => onEdit(todo.id, {})}>Edit</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </div>
    );
}; 