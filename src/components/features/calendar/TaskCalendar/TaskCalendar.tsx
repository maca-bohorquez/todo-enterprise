import type { Todo } from '@/types/todo';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskCalendar.css';

const locales = {
    'es': es,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface TaskCalendarProps {
    todos: Todo[];
    onSelectEvent: (todo: Todo) => void;
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ todos, onSelectEvent }) => {
    const events = todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        start: todo.dueDate ? new Date(todo.dueDate) : new Date(todo.createdAt),
        end: todo.dueDate ? new Date(todo.dueDate) : new Date(todo.createdAt),
        todo: todo,
        className: `event-${todo.status}`
    }));

    return (
        <div className="calendar-wrapper">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 200px)' }}
                views={['month', 'week', 'day']}
                defaultView="month"
                onSelectEvent={(event) => onSelectEvent(event.todo)}
                popup
                selectable
                className="modern-calendar"
                tooltipAccessor={(event: any) => `${event.title} - ${event.todo.status}`}
            />
        </div>
    );
}; 