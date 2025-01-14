import { Button } from '@/components/common/Button/Button';
import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onSubmit: (data: { title: string }) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title: title.trim() });
    setTitle('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className={styles.input}
          autoFocus
        />
      </div>
      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          startIcon={<FiPlus />}
          className={styles.addButton}
        >
          Add
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          startIcon={<FiX />}
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}; 