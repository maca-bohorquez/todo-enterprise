import { Button } from '@/components/common/Button/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal/ConfirmationModal';
import { Todo, TodoPriority } from '@/types/todo';
import { format } from 'date-fns';
import { useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { LuCheck, LuX } from 'react-icons/lu';

import { CheckList } from '@/components/common/CheckList';
import { DatePicker } from '../../DatePicker/DatePicker';
import { LabelPicker } from '../../LabelPicker/LabelPicker';
import { PriorityPicker } from '../../PriorityPicker/PriorityPicker';
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

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

interface Checklist {
    id: string;
    title: string;
    items: ChecklistItem[];
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
    const [priority, setPriority] = useState<TodoPriority>(todo.priority || 'medium');
    const [labels, setLabels] = useState<Label[]>(todo.labels || []);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editingLabel, setEditingLabel] = useState<EditingLabel | null>(null);
    const [showChecklistForm, setShowChecklistForm] = useState(false);
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [newChecklistTitle, setNewChecklistTitle] = useState('');

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

    const getPriorityColor = (priority: TodoPriority): string =>
        priority === 'high' ? '#EF4444' :
            priority === 'medium' ? '#F59E0B' :
                '#10B981';

    const handleAddChecklist = (title: string) => {
        if (!title.trim()) return;

        const newChecklist: Checklist = {
            id: Date.now().toString(),
            title,
            items: []
        };
        setChecklists([...checklists, newChecklist]);
        setShowChecklistForm(false);
        setNewChecklistTitle('');
    };

    const handleDeleteChecklist = (id: string) => {
        setChecklists(checklists.filter(cl => cl.id !== id));
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerActions}>
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
                            placeholder="Task title"
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
                            {priority && (
                                <div className={styles.priorityLabel} style={{ color: getPriorityColor(priority) }}>
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
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

                <div className={`${styles.modalContent} customScroll`}>
                    <div className={`${styles.mainSection} customScroll`}>
                        <div className={styles.descriptionSection}>
                            <h3>Description</h3>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a more detailed description..."
                                className={`${styles.descriptionInput} customScroll`}
                            />
                            <div className={`${styles.checklistsContainer} customScroll`}>
                                {checklists.map(checklist => (
                                    <div className={styles.checklistSection} key={checklist.id}>
                                        <div className={styles.checklistHeader}>
                                            <h3>{checklist.title}</h3>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleDeleteChecklist(checklist.id)}
                                                className={styles.deleteButton}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <CheckList
                                            items={checklist.items}
                                            onChange={(items) => {
                                                setChecklists(checklists.map(cl =>
                                                    cl.id === checklist.id ? { ...cl, items } : cl
                                                ));
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
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

                    <div className={`${styles.sideSection} customScroll`}>
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
                        <Button
                            variant="secondary"
                            size="sm"
                            startIcon={<LuCheck />}
                            onClick={() => setShowChecklistForm(true)}
                            className={styles.optionButton}
                        >
                            Add Checklist
                        </Button>

                        {showChecklistForm && (
                            <div className={styles.checklistForm}>
                                <input
                                    type="text"
                                    placeholder="Checklist title..."
                                    className={styles.checklistTitleInput}
                                    value={newChecklistTitle}
                                    onChange={(e) => setNewChecklistTitle(e.target.value)}
                                    autoFocus
                                />
                                <div className={styles.checklistFormActions}>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAddChecklist(newChecklistTitle)}
                                        disabled={!newChecklistTitle.trim()}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setShowChecklistForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
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