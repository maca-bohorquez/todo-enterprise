import { Button } from '@/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import DatePickerLib from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from 'react-dom';
import { LuCalendarClock, LuX } from 'react-icons/lu';
import styles from './DatePicker.module.css';

interface DatePickerProps {
    dueDate: string;
    onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    dueDate,
    onDateChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        dueDate ? new Date(dueDate) : null
    );
    const [timeInput, setTimeInput] = useState(
        selectedDate?.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }) || ''
    );

    const buttonRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPopoverPosition({
                top: rect.top - 150,
                left: rect.left + window.scrollX
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const newDate = new Date(date);
            if (selectedDate) {
                newDate.setHours(selectedDate.getHours());
                newDate.setMinutes(selectedDate.getMinutes());
            }
            setSelectedDate(newDate);
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeInput(e.target.value);
        if (selectedDate && e.target.value) {
            const [hours, minutes] = e.target.value.split(':');
            const newDate = new Date(selectedDate);
            newDate.setHours(parseInt(hours), parseInt(minutes));
            setSelectedDate(newDate);
        }
    };

    const handleDateSelect = () => {
        if (selectedDate) {
            onDateChange(selectedDate.toISOString());
        }
        setIsOpen(false);
    };

    return (
        <>
            <div ref={buttonRef}>
                <Button
                    variant="secondary"
                    size="sm"
                    startIcon={<LuCalendarClock />}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedDate
                        ? selectedDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        : "Set due date"}
                </Button>
            </div>

            {isOpen && createPortal(
                <div
                    className={styles.popover}
                    ref={popoverRef}
                    style={{
                        top: `${popoverPosition.top}px`,
                        left: `${popoverPosition.left}px`
                    }}
                >
                    <div className={styles.header}>
                        <span>Select date & time</span>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >
                            <LuX />
                        </button>
                    </div>

                    <div className={styles.content}>
                        <DatePickerLib
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                            calendarClassName={styles.calendar}
                        />

                        <div className={styles.timeInput}>
                            <label>Time</label>
                            <input
                                type="time"
                                value={timeInput}
                                onChange={handleTimeChange}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                setSelectedDate(null);
                                setTimeInput('');
                                onDateChange('');
                                setIsOpen(false);
                            }}
                        >
                            Remove
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleDateSelect}
                        >
                            Save
                        </Button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}; 