import { format } from 'date-fns';
import React from 'react';
import './TodoDatePicker.css';

interface TodoDatePickerProps {
    date?: Date;
    time?: string;
    onDateChange: (date: Date) => void;
    onTimeChange: (time: string) => void;
}

export const TodoDatePicker: React.FC<TodoDatePickerProps> = ({
    date,
    time,
    onDateChange,
    onTimeChange
}) => {
    return (
        <div className="todo-date-picker">
            <div className="date-input">
                <label htmlFor="due-date">Due Date</label>
                <input
                    type="date"
                    id="due-date"
                    value={date ? format(date, 'yyyy-MM-dd') : ''}
                    onChange={(e) => onDateChange(new Date(e.target.value))}
                />
            </div>
            <div className="time-input">
                <label htmlFor="due-time">Due Time</label>
                <input
                    type="time"
                    id="due-time"
                    value={time || ''}
                    onChange={(e) => onTimeChange(e.target.value)}
                />
            </div>
        </div>
    );
}; 