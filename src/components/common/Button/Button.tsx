import { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'button',
    variant,
    size,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {startIcon && <span className="button-icon">{startIcon}</span>}
      {children}
      {endIcon && <span className="button-icon">{endIcon}</span>}
    </button>
  );
};