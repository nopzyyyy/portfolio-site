import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Lock, User } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md px-4 py-20">
      <div className="card p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
            <Lock size={28} className="text-primary-600 dark:text-primary-300" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Admin Login
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Log in to access the admin panel
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-neutral-500 dark:text-neutral-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input pl-10"
                placeholder="Username"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-neutral-500 dark:text-neutral-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="Password"
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              For demo: username = "admin", password = "password"
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;