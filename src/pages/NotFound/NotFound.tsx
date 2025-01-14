import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className={styles.link}>
        Return to Dashboard
      </Link>
    </div>
  );
}; 