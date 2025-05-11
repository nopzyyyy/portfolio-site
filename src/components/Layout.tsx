import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DonateButton from './DonateButton';
import DonateModal from './DonateModal';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen relative overflow-hidden font-poppins">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 transition-all duration-300">
        <div className="md:hidden absolute top-4 left-4 z-30">
          <button 
            onClick={toggleSidebar}
            className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-700 dark:text-neutral-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      
      <DonateButton onClick={() => setIsDonateModalOpen(true)} />
      
      {isDonateModalOpen && (
        <DonateModal onClose={() => setIsDonateModalOpen(false)} />
      )}
    </div>
  );
};

export default Layout;