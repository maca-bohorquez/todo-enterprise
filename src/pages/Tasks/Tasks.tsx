import { TaskBoard } from '@/components/features/todos/TaskBoard/TaskBoard';
import { useTodoStore } from '@/store/todoStore';
import './Tasks.css';

export const Tasks = () => {
    const { todos, addTodo, updateTodo, deleteTodo } = useTodoStore();

    return (
        <div className="tasks-page">
            <div className="tasks-header">
                <h1>Task Board</h1>
                <p>Manage and organize your tasks</p>
            </div>
            <TaskBoard
                todos={todos}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
                onAddTodo={(title, status) => addTodo(title, status)}
            />
        </div>
    );
}; 