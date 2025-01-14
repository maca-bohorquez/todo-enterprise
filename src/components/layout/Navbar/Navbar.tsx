import { useState } from 'react';
import { FiCalendar, FiChevronsLeft, FiGrid, FiList, FiLogOut } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
    onCollapse?: (collapsed: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCollapse }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const handleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onCollapse?.(newCollapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', icon: FiGrid, label: 'Dashboard' },
        { path: '/tasks', icon: FiList, label: 'All Tasks' },
        { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
    ];

    return (
        <nav className={`navbar customScroll ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="navHeader">
                <div className="navUser">
                    <img
                        src={user.avatar || '/default-avatar.png'}
                        alt=""
                        className="userAvatar"
                    />
                    <div className="userInfo">
                        <span className="userName">{user.email}</span>
                        <button onClick={handleLogout} className="logoutButton">
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="navSection">
                <h3 className="navSectionTitle">MENU</h3>
                <ul className="navList">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
                            >
                                <item.icon className="navIcon" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="collapseButton"
                onClick={handleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                <FiChevronsLeft />
            </button>
        </nav>
    );
}; 