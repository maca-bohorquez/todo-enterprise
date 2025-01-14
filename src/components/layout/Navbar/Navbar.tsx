import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { FiCalendar, FiChevronsLeft, FiGrid, FiList, FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
    onCollapse?: (collapsed: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCollapse }) => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuthStore();


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !user) {
            const parsedUser = JSON.parse(storedUser);
            useAuthStore.setState({ user: parsedUser, isAuthenticated: true });
        }
    }, [user]);

    const handleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onCollapse?.(newCollapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        useAuthStore.setState({ user: null, isAuthenticated: false });
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
                    <div className="userInfo">
                        <span className="userName">{user?.name || 'User'}</span>
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

            <div className="navLogoutSection">
                <button onClick={handleLogout} className="logoutButton">
                    <div className="logoutContent">
                        <FiLogOut className="navIcon" />
                        <span>Logout</span>
                    </div>
                </button>
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