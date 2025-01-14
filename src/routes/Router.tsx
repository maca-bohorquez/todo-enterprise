import { Layout } from '@/components/layout/Layout/Layout';
import { Calendar } from '@/pages/Calendar/Calendar';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Login } from '@/pages/Login/Login';
import { Tasks } from '@/pages/Tasks/Tasks';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id ? children : <Navigate to="/login" />;
};

export const Router = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <Routes>
            <Route path="/login" element={
                user.id ? <Navigate to="/dashboard" /> : <Login />
            } />

            <Route path="/" element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="calendar" element={<Calendar />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}; 