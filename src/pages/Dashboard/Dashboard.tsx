import { TaskCarousel } from '@/components/features/home/TaskCarousel/TaskCarousel';
import { useTodoStore } from '@/store/todoStore';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { todos, updateTodo, deleteTodo } = useTodoStore();
  const navigate = useNavigate();

  const pendingTasks = todos.filter(todo => todo.status === 'TODO');
  const inProgressTasks = todos.filter(todo => todo.status === 'IN_PROGRESS');
  const completedTasks = todos.filter(todo => todo.status === 'DONE');

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p className="stat-number">{pendingTasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">{inProgressTasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedTasks.length}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Tasks</h2>
          <button
            className="view-all-button"
            onClick={() => navigate('/tasks')}
          >
            View All Tasks <FiArrowRight />
          </button>
        </div>
        <TaskCarousel
          title="To Do"
          tasks={pendingTasks}
          onEdit={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Dashboard; 