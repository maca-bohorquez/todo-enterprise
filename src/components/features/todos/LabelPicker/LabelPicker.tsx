import { Button } from '@/components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { LuCheck, LuTag } from 'react-icons/lu';
import styles from './LabelPicker.module.css';

interface Label {
    id: string;
    title: string;
    color: string;
}

interface LabelPickerProps {
    labels: Label[];
    onLabelsChange: (labels: Label[]) => void;
}

export const LabelPicker: React.FC<LabelPickerProps> = ({
    labels,
    onLabelsChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempTitle, setTempTitle] = useState('');
    const [tempColor, setTempColor] = useState('#3B82F6');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = () => {
        if (tempTitle.trim()) {
            onLabelsChange([...labels, {
                id: crypto.randomUUID(),
                title: tempTitle.trim(),
                color: tempColor
            }]);
            setTempTitle('');
            setIsOpen(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempTitle.trim()) {
            handleSave();
        }
    };

    const colors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Yellow
        '#EF4444', // Red
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#06B6D4', // Cyan
        '#F97316', // Orange
    ];

    return (
        <div ref={containerRef} className={styles.labelPickerContainer}>
            <Button
                variant="secondary"
                size="sm"
                startIcon={<LuTag />}
                className={styles.optionButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                Labels
            </Button>

            {isOpen && (
                <div className={styles.labelPickerPopup}>
                    <input
                        type="text"
                        value={tempTitle}

                        onChange={(e) => setTempTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter label title..."
                        className={styles.labelInput}
                        autoFocus
                    />
                    <div className={styles.colorGrid}>
                        {colors.map((color) => (
                            <button
                                key={color}
                                className={`${styles.colorOption} ${color === tempColor ? styles.selected : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setTempColor(color)}
                            />
                        ))}
                    </div>
                    <Button
                        variant="primary"
                        size="sm"
                        startIcon={<LuCheck />}
                        className={styles.saveButton}
                        onClick={handleSave}
                        disabled={!tempTitle.trim()}
                    >
                        Add Label
                    </Button>
                </div>
            )}
        </div>
    );
}; 