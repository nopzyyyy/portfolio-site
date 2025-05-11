import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary inline-flex items-center"
      >
        <Home size={18} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;