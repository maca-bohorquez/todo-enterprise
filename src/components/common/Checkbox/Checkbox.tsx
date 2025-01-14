import React from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className={clsx(styles.checkbox, className)}
        {...props}
      />
      <span className={styles.label}>{label}</span>
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}; 