export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: TodoPriority;
  dueDate?: string;
  labels: Array<{
    id: string;
    title: string;
    color: string;
  }>;
} 