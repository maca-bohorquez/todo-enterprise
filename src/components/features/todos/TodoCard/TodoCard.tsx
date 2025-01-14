import { Button } from '@/components/common/Button/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal/ConfirmationModal';
import { EditButton } from '@/components/common/EditButton/EditButton';
import type { Todo } from '@/types/todo';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { FiCheck, FiClock, FiFlag, FiTrash2 } from 'react-icons/fi';
import './TodoCard.css';

interface TodoCardProps {
    todo: Todo;
    onEdit: (id: string, updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        onDelete(todo.id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className={`todo-card ${isExpanded ? 'expanded' : ''}`}>
                {!isExpanded ? (
                    <div className="todo-card-preview" onClick={() => setIsExpanded(true)}>
                        <div className="todo-card-header">
                            <h3>{todo.title}</h3>
                            <div className="todo-card-actions">
                                <EditButton
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        setIsExpanded(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="todo-card-meta">
                            <div className="todo-card-status">
                                <span className={`status-badge ${todo.status.toLowerCase()}`}>
                                    {todo.status}
                                </span>
                            </div>
                            {todo.dueDate && (
                                <div className="todo-card-due-date">
                                    <FiClock />
                                    <span>{format(new Date(todo.dueDate), 'MMM d, yyyy')}</span>
                                </div>
                            )}
                            {todo.priority && (
                                <div className="todo-card-priority">
                                    <FiFlag />
                                    <span>{todo.priority}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="todo-card-expanded">
                        <div className="todo-card-header">
                            <input
                                type="text"
                                value={todo.title}
                                onChange={(e) => onEdit(todo.id, { title: e.target.value })}
                                className="title-input"
                            />
                            <div className="todo-card-actions">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    startIcon={<FiCheck />}
                                    onClick={() => setIsExpanded(false)}
                                    className="action-btn"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    startIcon={<FiTrash2 />}
                                    onClick={() => setShowDeleteModal(true)}
                                    className="delete-btn"
                                />
                            </div>
                        </div>
                        <div className="todo-card-content">
                            <select
                                value={todo.status}
                                onChange={(e) => onEdit(todo.id, { status: e.target.value as Todo['status'] })}
                                className="status-select"
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <ConfirmationModal
                    title="Delete Task"
                    message="Are you sure you want to delete this task? This action cannot be undone."
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
}; 