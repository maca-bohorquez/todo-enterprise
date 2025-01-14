import { Layout } from '@/components/layout/Layout/Layout';
import { Calendar } from '@/pages/Calendar/Calendar';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Login } from '@/pages/Login/Login';
import { Tasks } from '@/pages/Tasks/Tasks';
import { useAuthStore } from '@/store/authStore';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={
        !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
      } />

      {/* Rutas privadas */}
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