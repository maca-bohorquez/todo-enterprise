import type { Todo } from '@/types/todo';
import React from 'react';
import { TodoCard } from '../../todos/TodoCard/TodoCard';
import './TaskCarousel.css';

interface TaskCarouselProps {
    title: string;
    tasks: Todo[];
    onEdit: (id: string, updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

export const TaskCarousel: React.FC<TaskCarouselProps> = ({
    title,
    tasks,
    onEdit,
    onDelete
}) => {
    return (
        <div className="task-carousel">
            <h2 className="carousel-title">{title}</h2>
            <div className="carousel-container">
                {tasks.length > 0 ? (
                    <div className="carousel-content">
                        {tasks.map((task) => (
                            <div key={task.id} className="carousel-item">
                                <TodoCard
                                    todo={task}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        No tasks available
                    </div>
                )}
            </div>
        </div>
    );
}; 