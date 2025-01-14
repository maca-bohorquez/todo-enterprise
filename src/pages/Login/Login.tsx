import { Button } from '@/components/common/Button/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        await login(email, password);
    };

    return (
        <div className="login-container">
            {isLoading && <LoadingSpinner />}
            <div className="login-content">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Please sign in to continue</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-group">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Password"
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login; 