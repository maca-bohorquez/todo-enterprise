import { LuTriangleAlert } from 'react-icons/lu';
import { Button } from '../Button/Button';
import styles from './ConfirmationModal.module.css';
import './ConfirmationModal.pulse.css';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className="pulse-wrapper">
                        <div className="pulse-ring"></div>
                        <div className="pulse-icon">
                            <LuTriangleAlert size={24} />
                        </div>
                    </div>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <p className={styles.modalMessage}>{message}</p>
                    <div className={styles.modalActions}>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onCancel}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onConfirm}
                            className={styles.confirmButton}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 