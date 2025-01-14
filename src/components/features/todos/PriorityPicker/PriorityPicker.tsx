import { Button } from '@/components/common/Button/Button';
import { TodoPriority } from '@/types/todo';
import { useEffect, useRef, useState } from 'react';
import { LuFlag } from 'react-icons/lu';
import styles from './PriorityPicker.module.css';

interface PriorityPickerProps {
    priority: TodoPriority;
    onPriorityChange: (priority: TodoPriority) => void;
}

export const PriorityPicker: React.FC<PriorityPickerProps> = ({
    priority,
    onPriorityChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const priorities = [
        { value: 'low', label: 'Low', color: '#10B981' },
        { value: 'medium', label: 'Medium', color: '#F59E0B' },
        { value: 'high', label: 'High', color: '#EF4444' }
    ] as const;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.priorityPickerContainer} ref={containerRef}>
            <Button
                variant="secondary"
                size="sm"
                startIcon={<LuFlag />}
                className={styles.optionButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                Priority
            </Button>

            {isOpen && (
                <div className={styles.priorityPickerPopup}>
                    {priorities.map((p) => (
                        <Button
                            key={p.value}
                            variant="secondary"
                            size="sm"
                            className={`${styles.priorityOption} ${priority === p.value ? styles.selected : ''}`}
                            style={{ color: p.color }}
                            onClick={() => {
                                onPriorityChange(p.value);
                                setIsOpen(false);
                            }}
                        >
                            {p.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}; 