export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TodoPriority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';

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
  createdAt: string;
  updatedAt: string;
} 