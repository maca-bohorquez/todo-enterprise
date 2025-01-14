import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div>
      <header>
        <h1>Todo App</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}; 