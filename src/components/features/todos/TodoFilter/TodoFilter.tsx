import React from 'react';
import styles from './TodoFilter.module.css';
import { TodoStatus } from '@/types/todo';

interface TodoFilterProps {
  currentFilter: TodoStatus | 'all';
  onFilterChange: (filter: TodoStatus | 'all') => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ 
  currentFilter = 'all',
  onFilterChange 
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <button
          className={`${styles.filterButton} ${currentFilter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'pending' ? styles.active : ''}`}
          onClick={() => onFilterChange('pending')}
        >
          To Do
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'in-progress' ? styles.active : ''}`}
          onClick={() => onFilterChange('in-progress')}
        >
          In Progress
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'completed' ? styles.active : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
}; 