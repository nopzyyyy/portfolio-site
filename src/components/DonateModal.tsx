import React, { useState } from 'react';
import { X, Copy, QrCode } from 'lucide-react';
import { useProfileStore } from '../stores/profileStore';

interface DonateModalProps {
  onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ onClose }) => {
  const { profile } = useProfileStore();
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(profile.cryptoAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="card w-full max-w-md p-6 z-10 shadow-xl animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Support My Work</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          If you enjoy my work and want to support my creative journey, 
          you can donate to my crypto wallet. Any contribution is greatly appreciated!
        </p>
        
        <div className="mb-6">
          <label 
            htmlFor="cryptoAddress" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Crypto Wallet Address
          </label>
          <div className="relative">
            <input
              id="cryptoAddress"
              type="text"
              value={profile.cryptoAddress}
              readOnly
              className="input pr-10"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Copy address"
            >
              <Copy size={20} />
            </button>
          </div>
          {copied && (
            <p className="text-primary-600 dark:text-primary-400 text-sm mt-1">
              Copied to clipboard!
            </p>
          )}
        </div>
        
        <div className="flex flex-col">
          {showQrCode ? (
            <div className="aspect-square w-full max-w-xs mx-auto bg-white p-4 rounded-lg mb-4">
              <div className="flex items-center justify-center h-full bg-neutral-100 rounded">
                {/* This would be a real QR code in a production app */}
                <div className="text-center">
                  <p className="text-sm text-neutral-500">QR Code Placeholder</p>
                  <p className="text-xs text-neutral-400 mt-1">Scan with your wallet app</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowQrCode(true)}
              className="btn btn-secondary flex items-center justify-center mb-4"
            >
              <QrCode size={18} className="mr-2" />
              Show QR Code
            </button>
          )}
          
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;