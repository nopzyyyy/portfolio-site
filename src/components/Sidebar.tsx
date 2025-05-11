import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Mail, User, Moon, Sun, LogOut } from 'lucide-react';
import { useProfileStore } from '../stores/profileStore';
import { useThemeStore } from '../stores/themeStore';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { profile } = useProfileStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isLoggedIn, logout } = useAuthStore();
  
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside 
        className={`sidebar ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <Camera size={36} className="text-primary-600 dark:text-primary-300" />
            </div>
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 flex items-center justify-center mt-1">
              <Mail size={16} className="mr-1" />
              {profile.email}
            </p>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mb-6">
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              About Me
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
              {profile.bio}
            </p>
          </div>
          
          <nav className="mt-4 mb-auto">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center p-3 rounded-lg transition-colors 
                    ${location.pathname === '/' 
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  onClick={onClose}
                >
                  <Camera size={20} className="mr-3" />
                  <span>Gallery</span>
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link 
                    to="/admin" 
                    className={`flex items-center p-3 rounded-lg transition-colors 
                      ${location.pathname === '/admin' 
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    onClick={onClose}
                  >
                    <User size={20} className="mr-3" />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link 
                    to="/login" 
                    className={`flex items-center p-3 rounded-lg transition-colors 
                      ${location.pathname === '/login' 
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                    onClick={onClose}
                  >
                    <User size={20} className="mr-3" />
                    <span>Admin Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
            <div className="flex justify-between items-center">
              <button
                onClick={toggleDarkMode}
                className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span className="ml-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              {isLoggedIn && (
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="flex items-center p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;