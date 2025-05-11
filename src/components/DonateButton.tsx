import React from 'react';
import { HeartIcon } from 'lucide-react';

interface DonateButtonProps {
  onClick: () => void;
}

const DonateButton: React.FC<DonateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full p-3 shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      aria-label="Donate"
    >
      <HeartIcon size={24} />
    </button>
  );
};

export default DonateButton;