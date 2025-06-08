// src/components/LogoutButton.jsx
import React, { useState } from 'react';

export default function LogoutButton({ 
  className = "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors",
  children = "Logout",
  showConfirmation = true 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    if (showConfirmation && !showModal) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    setShowModal(false);

    try {
      // Import auth dynamically to avoid SSR issues
      const { authActions } = await import('../stores/authStore.js');
      const result = await authActions.signOut();
      
      if (!result.success) {
        console.error('Logout error:', result.error);
        alert('Error signing out. Please try again.');
        setIsLoading(false);
      }
      // If successful, redirect happens automatically in authActions.signOut()
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error signing out. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing out...
          </span>
        ) : (
          children
        )}
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out of your USRad account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}