import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className
}) => {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};
