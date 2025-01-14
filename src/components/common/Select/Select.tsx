import React from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      )}
      <select
        className={clsx(
          styles.select,
          error && styles.error,
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
