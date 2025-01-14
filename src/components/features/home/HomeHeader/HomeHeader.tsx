import { Button } from '@/components/common/Button/Button';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './HomeHeader.css';

interface HomeHeaderProps {
    onNewTask: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onNewTask }) => {
    return (
        <div className="home-header">
            <div className="header-content">
                <h1>Welcome Back!</h1>
                <p>Here's an overview of your tasks</p>
            </div>
            <Button
                variant="primary"
                size="lg"
                startIcon={<FiPlus className="plus-icon" />}
                onClick={onNewTask}
                className="new-task-btn"
            >
                New Task
            </Button>
        </div>
    );
}; 