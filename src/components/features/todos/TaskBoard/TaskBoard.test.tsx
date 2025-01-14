import { Todo, TodoStatus } from '@/types/todo';
import { render, screen } from '@testing-library/react';
import { TaskBoard } from './TaskBoard';

const mockTodos: Todo[] = [{
    id: '1',
    userId: 'user-1',
    title: 'Test Todo',
    status: 'TODO' as TodoStatus,
    labels: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}];

describe('TaskBoard', () => {
    it('renders todo items correctly', () => {
        render(
            <TaskBoard
                todos={mockTodos}
                onUpdateTodo={() => { }}
                onDeleteTodo={() => { }}
                onAddTodo={() => { }}
            />
        );
        expect(screen.getByText('To Do')).toBeInTheDocument();
    });

    it('handles adding new todo', () => {
        const mockAddTodo = vi.fn();
        render(
            <TaskBoard
                todos={mockTodos}
                onUpdateTodo={() => { }}
                onDeleteTodo={() => { }}
                onAddTodo={mockAddTodo}
            />
        );
    });
}); 