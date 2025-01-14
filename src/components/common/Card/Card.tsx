import { Button } from '@/components/common/Button/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal/ConfirmationModal';
import type { Todo } from '@/types/todo';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiClock, FiFlag } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';
import { TodoModal } from '../../features/todos/TodoModal/TodoModal';
import { EditButton } from '../EditButton/EditButton';
import styles from './Card.module.css';

interface CardProps {
  todo: Todo;
  index: number;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ todo, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high': return '#E53E3E';
      case 'medium': return '#DD6B20';
      case 'low': return '#38A169';
      default: return '#718096';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: format(date, 'MMM d, yyyy'),
      time: format(date, 'h:mm a')
    };
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}>
          <span onClick={() => setIsModalOpen(true)}>{todo.title}</span>
          <div className={styles.cardActions}>
            <EditButton onClick={() => setIsModalOpen(true)} />
            <div className={styles.optionsContainer} ref={optionsRef}>
              <Button
                variant='secondary'
                size="sm"
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className={styles.optionsButton}
              >
                <BsThreeDotsVertical />
              </Button>
              {showOptionsMenu && (
                <div className={styles.optionsMenu}>
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      setShowDeleteConfirmation(true);
                      setShowOptionsMenu(false);
                    }}
                  >
                    <LuTrash2 />
                    Delete Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.metaContainer}>
          {todo.dueDate && (
            <div className={styles.dueDate}>
              <FiClock />
              <span>{formatDateTime(todo.dueDate).date}</span>
            </div>
          )}
          <div className={styles.priority} style={{ color: getPriorityColor() }}>
            <FiFlag />
            <span>{todo.priority}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={todo}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updates) => onUpdate(todo.id, updates)}
          onDelete={() => onDelete(todo.id)}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={() => {
            onDelete(todo.id);
            setShowDeleteConfirmation(false);
          }}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
}; 