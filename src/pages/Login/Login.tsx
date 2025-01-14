import { Button } from '@/components/common/Button/Button';
import { api } from '@/services/api';
import { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const user = await api.login({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/todos');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <h1>Welcome to Follow Up</h1>
                    <p>Sign in to continue to your account</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <div className="input-icon">
                            <FiMail className="icon" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-icon">
                            <FiLock className="icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="login-button"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}; 