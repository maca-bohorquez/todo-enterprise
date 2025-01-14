import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Navbar } from '../Navbar/Navbar';
import './Layout.css';

export const Layout = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);

    return (
        <div className="layout">
            <Navbar onCollapse={setIsNavCollapsed} />
            <div className="mainWrapper">
                <Header className={isNavCollapsed ? 'expanded' : ''} />
                <main className={`mainContent ${isNavCollapsed ? 'expanded' : ''}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}; 