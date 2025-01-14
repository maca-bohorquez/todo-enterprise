import type { Todo } from '@/types/todo';
import { format } from 'date-fns';
import { useState } from 'react';
import { FiClock, FiEdit2, FiFlag } from 'react-icons/fi';
import { TodoModal } from '../../features/todos/TodoModal/TodoModal';
import styles from './Card.module.css';

interface CardProps {
  todo: Todo;
  index: number;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ todo, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div
        className={`${styles.card} ${styles[todo.status.toLowerCase()]}`}
        style={{
          borderLeft: todo.labels?.length ? `4px solid ${todo.labels[0].color}` : undefined
        }}
      >
        <div className={styles.title}>
          <span>{todo.title}</span>
          <button
            className={styles.editButton}
            onClick={() => setIsModalOpen(true)}
          >
            <FiEdit2 />
          </button>
        </div>

        {todo.labels?.length > 0 && (
          <span
            className={styles.label}
            style={{ backgroundColor: todo.labels[0].color }}
          >
            {todo.labels[0].title}
          </span>
        )}

        <div className={styles.details}>
          {todo.dueDate && (
            <div className={styles.dueDate}>
              <FiClock />
              <div className={styles.dateTimeInfo}>
                <span>{formatDateTime(todo.dueDate).date}</span>
                <span>{formatDateTime(todo.dueDate).time}</span>
              </div>
            </div>
          )}
          {todo.priority && (
            <div
              className={styles.priority}
              style={{ color: getPriorityColor() }}
            >
              <FiFlag />
              <span>{todo.priority}</span>
            </div>
          )}
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
    </>
  );
}; 