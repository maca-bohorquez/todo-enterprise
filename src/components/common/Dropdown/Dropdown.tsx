import { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    align = 'right'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div className={`dropdown-menu ${align}`}>
                    {children}
                </div>
            )}
        </div>
    );
}; 