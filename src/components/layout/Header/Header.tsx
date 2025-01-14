import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiBell, FiSearch } from 'react-icons/fi';
import './Header.css';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const currentDate = format(new Date(), "EEEE, d 'de' MMMM", { locale: es });

    return (
        <header className={`header ${className}`}>
            <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Find your Task, Projects..."
                    className="search-input"
                />
            </div>
            <div className="header-actions">
                <span className="current-date">{currentDate}</span>
                <div className="notification-wrapper">
                    <button className="notification-btn">
                        <FiBell />
                        <span className="notification-badge">3</span>
                    </button>
                </div>
            </div>
        </header>
    );
}; 