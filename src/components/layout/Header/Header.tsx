import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './Header.css';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    className = ''
}) => {
    const currentTime = format(new Date(), 'HH:mm:ss');
    const currentDay = format(new Date(), 'EEEE, dd MMM', { locale: es });

    return (
        <header className={`header ${className}`}>
            <div className="header-actions">
                <div className="current-date-container">
                    <span className="current-time">{currentTime}</span>
                    <span className="current-day">{currentDay}</span>
                </div>
                <div className="notification-wrapper">
                </div>
            </div>
        </header>
    );
}; 