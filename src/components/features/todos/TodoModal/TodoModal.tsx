import { Button } from '@/components/common/Button/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal/ConfirmationModal';
import { Todo, TodoPriority } from '@/types/todo';
import { format } from 'date-fns';
import { useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { LuTrash2, LuX } from 'react-icons/lu';
import { DatePicker } from '../DatePicker/DatePicker';
import { LabelPicker } from '../LabelPicker/LabelPicker';
import { PriorityPicker } from '../PriorityPicker/PriorityPicker';
import styles from './TodoModal.module.css';

interface TodoModalProps {
    todo: Todo;
    onClose: () => void;
    onUpdate: (updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

interface Label {
    id: string;
    title: string;
    color: string;
}

interface EditingLabel {
    id: string;
    title: string;
    color: string;
}

export const TodoModal: React.FC<TodoModalProps> = ({
    todo,
    onClose,
    onUpdate,
    onDelete
}) => {
    const PRESET_COLORS = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Yellow
        '#EF4444', // Red
        '#8B5CF6', // Purple
        '#EC4899', // Pink
    ] as const;

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || '');
    const [dueDate, setDueDate] = useState(todo.dueDate || '');
    const [priority, setPriority] = useState<TodoPriority>(todo.priority || 'low');
    const [labels, setLabels] = useState<Label[]>(todo.labels || []);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editingLabel, setEditingLabel] = useState<EditingLabel | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            title,
            description,
            dueDate,
            priority,
            labels
        });
        onClose();
    };

    const handleLabelClick = (label: Label) => {
        setEditingLabel({
            id: label.id,
            title: label.title,
            color: label.color
        });
    };

    const handleLabelUpdate = (updatedLabel: EditingLabel) => {
        const updatedLabels = labels.map(label =>
            label.id === updatedLabel.id ? updatedLabel : label
        );
        setLabels(updatedLabels);
        setEditingLabel(null);
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: format(date, 'MMM d, yyyy'),
            time: format(date, 'h:mm a')
        };
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerActions}>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setShowDeleteConfirmation(true)}
                            startIcon={<LuTrash2 />}
                            className={styles.deleteButton}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onClose}
                            startIcon={<LuX />}
                        >
                            Close
                        </Button>
                    </div>
                    <div className={styles.titleSection}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.titleInput}
                        />
                        <div className={styles.metadataList}>
                            {labels.length > 0 && (
                                <div className={styles.labelList}>
                                    {labels.map((label) => (
                                        <div
                                            key={label.id}
                                            className={styles.labelItem}
                                            style={{ backgroundColor: label.color }}
                                            onClick={() => handleLabelClick(label)}
                                        >
                                            {label.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {dueDate && (
                                <div className={styles.dueDateTag}>
                                    <FiClock />
                                    <span>{formatDateTime(dueDate).date}</span>
                                    <span>{formatDateTime(dueDate).time}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {editingLabel && (
                    <div className={styles.labelEditModal} onClick={() => setEditingLabel(null)}>
                        <div className={styles.labelEditContent} onClick={e => e.stopPropagation()}>
                            <input
                                type="text"
                                value={editingLabel.title}
                                onChange={(e) => setEditingLabel({
                                    ...editingLabel,
                                    title: e.target.value
                                })}
                                className={styles.labelEditInput}
                                placeholder="Label name"
                                autoFocus
                            />
                            <div className={styles.colorPicker}>
                                {PRESET_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        className={`${styles.colorOption} ${color === editingLabel.color ? styles.selected : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setEditingLabel({
                                            ...editingLabel,
                                            color
                                        })}
                                    />
                                ))}
                            </div>
                            <div className={styles.labelEditActions}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleLabelUpdate(editingLabel)}
                                    className={styles.saveButton}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setEditingLabel(null)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.modalContent}>
                    <div className={styles.mainSection}>
                        <div className={styles.descriptionSection}>
                            <h3>Description</h3>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a more detailed description..."
                                className={styles.descriptionInput}
                            />
                            <div className={styles.actionButtons}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSubmit}
                                    className={styles.saveButton}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setDescription(todo.description || '')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sideSection}>
                        <LabelPicker
                            labels={labels}
                            onLabelsChange={setLabels}
                        />
                        <DatePicker
                            dueDate={dueDate}
                            onDateChange={setDueDate}
                        />
                        <PriorityPicker
                            priority={priority}
                            onPriorityChange={setPriority}
                        />
                    </div>
                </div>
            </div>

            {showDeleteConfirmation && (
                <ConfirmationModal
                    title="Delete Task"
                    message="Are you sure you want to delete this task? This action cannot be undone."
                    onConfirm={() => {
                        onDelete(todo.id);
                        onClose();
                    }}
                    onCancel={() => setShowDeleteConfirmation(false)}
                />
            )}
        </div>
    );
}; 