import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import { TaskBoard } from '@/components/features/todos/TaskBoard/TaskBoard';
import { useTodoStore } from '@/store/todoStore';
import type { Todo } from '@/types/todo';
import React from 'react';
import './Tasks.css';

const Tasks: React.FC = () => {
    const { todos, addTodo, updateTodo, deleteTodo, isLoading } = useTodoStore();

    return (
        <div className="tasks-page">
            {isLoading && <LoadingSpinner />}
            <div className="tasks-header">
                <h1>Task Board</h1>
                <p>Manage and organize your tasks</p>
            </div>
            <TaskBoard
                todos={todos}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
                onAddTodo={(title: string, status: Todo['status']) => addTodo(title, status)}
            />
        </div>
    );
};

export default Tasks; 