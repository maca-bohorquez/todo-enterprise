import { TaskCalendar } from '@/components/features/calendar/TaskCalendar/TaskCalendar';
import { useTodoStore } from '@/store/todoStore';
import type { Todo } from '@/types/todo';
import './Calendar.css';

export const Calendar = () => {
    const { todos } = useTodoStore();

    const handleSelectEvent = (todo: Todo) => {
        console.log('Selected todo:', todo);
    };

    return (
        <div className="calendar-page">
            <div className="calendar-header">
                <h1>Calendar View</h1>
                <p>Manage your tasks timeline</p>
            </div>
            <TaskCalendar
                todos={todos}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    );
}; 