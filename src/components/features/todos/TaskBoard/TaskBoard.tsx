import { Card } from '@/components/common/Card/Card';
import type { Todo, TodoStatus } from '@/types/todo';
import { memo, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import styles from './TaskBoard.module.css';

interface TaskBoardProps {
    todos: Todo[];
    onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
    onDeleteTodo: (id: string) => void;
    onAddTodo: (title: string, status: TodoStatus) => void;
}

const COLUMNS: { title: string; status: TodoStatus }[] = [
    { title: 'To Do', status: 'TODO' },
    { title: 'In Progress', status: 'IN_PROGRESS' },
    { title: 'Done', status: 'DONE' }
];

export const TaskBoard = memo<TaskBoardProps>(({
    todos,
    onUpdateTodo,
    onDeleteTodo,
    onAddTodo
}) => {
    const [addingInColumn, setAddingInColumn] = useState<TodoStatus | null>(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = (status: TodoStatus) => {
        if (newTaskTitle.trim()) {
            onAddTodo(newTaskTitle.trim(), status);
            setNewTaskTitle('');
            setAddingInColumn(null);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, status: TodoStatus) => {
        if (e.key === 'Enter') {
            handleAddTask(status);
        } else if (e.key === 'Escape') {
            setAddingInColumn(null);
            setNewTaskTitle('');
        }
    };

    return (
        <div className={styles.board}>
            {COLUMNS.map(({ title, status }) => {
                const columnTodos = todos.filter(todo => todo.status === status);

                return (
                    <div key={status} className={styles.column}>
                        <h2 className={styles.columnTitle}>{title}</h2>
                        <div className={styles.taskList}>
                            {columnTodos.map((todo, index) => (
                                <Card
                                    key={todo.id}
                                    todo={todo}
                                    index={index}
                                    onUpdate={onUpdateTodo}
                                    onDelete={onDeleteTodo}
                                />
                            ))}

                            {addingInColumn === status ? (
                                <div className={styles.addTaskForm}>
                                    <input
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyDown={(e) => handleKeyPress(e, status)}
                                        placeholder="Enter task title..."
                                        autoFocus
                                    />
                                    <div className={styles.addTaskActions}>
                                        <button
                                            className={styles.addButton}
                                            onClick={() => handleAddTask(status)}
                                            disabled={!newTaskTitle.trim()}
                                        >
                                            <FiPlus /> Add
                                        </button>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setAddingInColumn(null);
                                                setNewTaskTitle('');
                                            }}
                                        >
                                            <FiX /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className={styles.addCardButton}
                                    onClick={() => setAddingInColumn(status)}
                                >
                                    <FiPlus /> New Task
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}); 