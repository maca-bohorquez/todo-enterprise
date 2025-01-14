import type { Todo } from '@/types/todo';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onStatusChange, onDelete, onEdit }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onEdit={(id, updates) => {
            if ('title' in updates && updates.title) onEdit(id, updates.title);
            if ('status' in updates && updates.status) onStatusChange(id, updates.status);
          }}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};