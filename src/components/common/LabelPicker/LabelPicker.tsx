import { Button } from '@/components/common/Button/Button';
import { memo, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import styles from './LabelPicker.module.css';

interface Label {
    id: string;
    title: string;
    color: string;
}

interface LabelPickerProps {
    selectedLabels: Label[];
    onSelect: (labels: Label[]) => void;
    onClose: () => void;
}

const PRESET_COLORS = [
    '#3182ce', // blue
    '#38a169', // green
    '#e53e3e', // red
    '#d69e2e', // yellow
    '#805ad5', // purple
    '#dd6b20', // orange
];

const LabelPicker = memo(({ selectedLabels, onSelect, onClose }: LabelPickerProps) => {
    const [newLabelTitle, setNewLabelTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

    const handleAddLabel = () => {
        if (!newLabelTitle.trim()) return;

        const newLabel: Label = {
            id: Date.now().toString(),
            title: newLabelTitle.trim(),
            color: selectedColor,
        };

        onSelect([...selectedLabels, newLabel]);
        setNewLabelTitle('');
    };

    const handleRemoveLabel = (labelId: string) => {
        onSelect(selectedLabels.filter(label => label.id !== labelId));
    };

    return (
        <div className={styles.picker} role="dialog" aria-label="Label picker">
            <div className={styles.header}>
                <h3 className={styles.title}>Labels</h3>
                <button onClick={onClose} className={styles.closeButton} aria-label="Close">
                    <FiX />
                </button>
            </div>

            <div className={styles.selectedLabels}>
                {selectedLabels.map(label => (
                    <div key={label.id} className={styles.label} style={{ backgroundColor: label.color }}>
                        <span>{label.title}</span>
                        <button
                            onClick={() => handleRemoveLabel(label.id)}
                            className={styles.removeLabel}
                            aria-label={`Remove ${label.title} label`}
                        >
                            <FiX />
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.addLabel}>
                <input
                    type="text"
                    value={newLabelTitle}
                    onChange={(e) => setNewLabelTitle(e.target.value)}
                    placeholder="Add new label..."
                    className={styles.input}
                />
                <div className={styles.colors}>
                    {PRESET_COLORS.map(color => (
                        <button
                            key={color}
                            className={`${styles.colorButton} ${color === selectedColor ? styles.selected : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Select ${color} color`}
                        />
                    ))}
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    startIcon={<FiPlus />}
                    onClick={handleAddLabel}
                    disabled={!newLabelTitle.trim()}
                >
                    Add
                </Button>
            </div>
        </div>
    );
});

LabelPicker.displayName = 'LabelPicker';

export default LabelPicker; 