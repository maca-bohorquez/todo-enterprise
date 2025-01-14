import { TodoStatus } from '@/types/todo';
import React from 'react';
import styles from './TodoFilter.module.css';

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
          className={`${styles.filterButton} ${currentFilter === 'TODO' ? styles.active : ''}`}
          onClick={() => onFilterChange('TODO')}
        >
          Pending
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'IN_PROGRESS' ? styles.active : ''}`}
          onClick={() => onFilterChange('IN_PROGRESS')}
        >
          In Progress
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'DONE' ? styles.active : ''}`}
          onClick={() => onFilterChange('DONE')}
        >
          Completed
        </button>
      </div>
    </div>
  );
}; 