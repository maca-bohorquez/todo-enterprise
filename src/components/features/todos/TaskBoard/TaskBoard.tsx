import { Todo } from '@/types/todo';
import { TodoCard } from '../TodoCard/TodoCard';
import styles from './TaskBoard.module.css';

interface TaskBoardProps {
    todos: Todo[];
    onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
    onDeleteTodo: (id: string) => void;
    onAddTodo: (title: string, status: Todo['status']) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
    todos,
    onUpdateTodo,
    onDeleteTodo,
    onAddTodo
}) => {
    const todoItems = todos.filter(todo => todo.status === 'TODO');
    const inProgressItems = todos.filter(todo => todo.status === 'IN_PROGRESS');
    const doneItems = todos.filter(todo => todo.status === 'DONE');

    return (
        <div className={styles.board}>
            <div className={styles.column}>
                <h2>To Do</h2>
                <div className={styles.dropZone}>
                    {todoItems.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={onUpdateTodo}
                            onDelete={onDeleteTodo}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.column}>
                <h2>In Progress</h2>
                <div className={styles.dropZone}>
                    {inProgressItems.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={onUpdateTodo}
                            onDelete={onDeleteTodo}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.column}>
                <h2>Done</h2>
                <div className={styles.dropZone}>
                    {doneItems.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={onUpdateTodo}
                            onDelete={onDeleteTodo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}; 