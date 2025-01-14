import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import { Layout } from '@/components/layout/Layout/Layout';
import { useAuthStore } from '@/store/authStore';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Lazy imports
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const Tasks = lazy(() => import('@/pages/Tasks'));

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>


        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};