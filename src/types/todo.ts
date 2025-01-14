export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TodoPriority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  dueDate?: string;
  priority?: TodoPriority;
  labels?: Array<{
    id: string;
    title: string;
    color: string;
  }>;
} 