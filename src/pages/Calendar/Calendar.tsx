import { TaskCalendar } from '@/components/features/calendar/TaskCalendar/TaskCalendar';
import { useTodoStore } from '@/store/todoStore';
import type { Todo } from '@/types/todo';
import React from 'react';
import './Calendar.css';

const Calendar: React.FC = () => {
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

export default Calendar; 