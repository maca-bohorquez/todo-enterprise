import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Router } from './routes/Router';

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
