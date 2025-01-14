import { format } from 'date-fns';
import React, { memo } from 'react';
import { FiClock, FiX } from 'react-icons/fi';
import styles from './DatePicker.module.css';

interface DatePickerProps {
    date?: Date;
    onSelect: (date: Date) => void;
    onClose: () => void;
}

const DatePicker = memo(({ date, onSelect, onClose }: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = React.useState(
        date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    );
    const [selectedTime, setSelectedTime] = React.useState(
        date ? format(date, 'HH:mm') : '12:00'
    );

    const handleSave = () => {
        const dateTime = new Date(`${selectedDate}T${selectedTime}`);
        onSelect(dateTime);
    };

    return (
        <div className={styles.picker} role="dialog" aria-label="Date and time picker">
            <div className={styles.header}>
                <h3 className={styles.title}>Set Due Date</h3>
                <button onClick={onClose} className={styles.closeButton} aria-label="Close">
                    <FiX />
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.dateInput}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.timeInput}>
                    <label htmlFor="time">Time</label>
                    <div className={styles.timeWrapper}>
                        <FiClock className={styles.clockIcon} />
                        <input
                            type="time"
                            id="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </div>

                <button onClick={handleSave} className={styles.saveButton}>
                    Save
                </button>
            </div>
        </div>
    );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker; 