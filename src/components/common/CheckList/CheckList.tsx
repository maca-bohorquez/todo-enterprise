import clsx from 'clsx';
import { memo, useState } from 'react';
import { LuCheck, LuSquare, LuTrash } from 'react-icons/lu';
import { Button } from '../Button/Button';
import styles from './CheckList.module.css';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

interface CheckListProps {
    items: ChecklistItem[];
    onChange: (items: ChecklistItem[]) => void;
}

const CheckList = memo(({ items, onChange }: CheckListProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = (id: string) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        onChange(updatedItems);
    };

    const handleTextChange = (id: string, text: string) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, text } : item
        );
        onChange(updatedItems);
    };

    const handleDelete = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id);
        onChange(updatedItems);
    };

    const addNewItem = () => {
        const newItem: ChecklistItem = {
            id: Date.now().toString(),
            text: '',
            completed: false
        };
        onChange([...items, newItem]);
    };

    const completedCount = items.filter(item => item.completed).length;
    const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

    return (
        <div className={styles.container}>
            <Button
                variant="secondary"
                size="sm"
                startIcon={<LuCheck />}
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.toggleButton}
            >
                Checklist {items.length > 0 && `(${completedCount}/${items.length})`}
            </Button>

            {isExpanded && (
                <div className={styles.checklist}>
                    {items.length > 0 && (
                        <>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                    role="progressbar"
                                    aria-valuenow={progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>

                            <ul className={styles.items}>
                                {items.map(item => (
                                    <li key={item.id} className={styles.item}>
                                        <button
                                            type="button"
                                            className={styles.checkbox}
                                            onClick={() => handleToggle(item.id)}
                                            aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
                                        >
                                            {item.completed ? <LuCheck /> : <LuSquare />}
                                        </button>
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => handleTextChange(item.id, e.target.value)}
                                            className={clsx(styles.input, item.completed && styles.completed)}
                                            placeholder="Add an item..."
                                        />
                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(item.id)}
                                            aria-label="Delete item"
                                        >
                                            <LuTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={addNewItem}
                        className={styles.addItemButton}
                    >
                        Add an item
                    </Button>
                </div>
            )}
        </div>
    );
});

export default CheckList; 