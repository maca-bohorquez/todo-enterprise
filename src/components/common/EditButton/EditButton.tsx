import { FiEdit2 } from 'react-icons/fi';
import styles from './EditButton.module.css';

interface EditButtonProps {
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    ariaLabel?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({
    onClick,
    className = '',
    ariaLabel = 'Edit'
}) => {
    return (
        <button
            className={`${styles.editButton} ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
            type="button"
        >
            <FiEdit2 />
        </button>
    );
}; 