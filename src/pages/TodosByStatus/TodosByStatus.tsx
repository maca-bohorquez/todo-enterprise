import { TodoList } from '@/components/features/todos/components/TodoList';
import { TodoFilter } from '@/components/features/todos/TodoFilter';
import type { TodoStatus } from '@/types/todo';
import { useParams } from 'react-router-dom';

export const TodosByStatus = () => {
  const { status } = useParams<{ status: TodoStatus }>();

  return (
    <div>
      <h1>Tasks by Status: {status}</h1>
      <TodoFilter
        currentFilter={status as TodoStatus}
        onFilterChange={(filter) => console.log(filter)}
      />
      <TodoList
        todos={[]}
        onStatusChange={(id, status) => console.log(id, status)}
        onDelete={(id) => console.log(id)}
        onEdit={(id) => console.log(id)}
      />
    </div>
  );
}; 