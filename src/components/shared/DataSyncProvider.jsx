// Real-time Data Sync Provider for USRad Platform
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { userDataFlowManager } from '@/services/userDataFlowManager';
import { toast } from 'sonner';

const DataSyncContext = createContext();

export const useDataSync = () => {
  const context = useContext(DataSyncContext);
  if (!context) {
    throw new Error('useDataSync must be used within a DataSyncProvider');
  }
  return context;
};

export const DataSyncProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, error, success
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [user, setUser] = useState(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored - syncing data...');
      syncPendingChanges();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('Connection lost - changes will be saved locally');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // Subscribe to real-time changes for this user
        subscribeToUserChanges(session.user.id);
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        subscribeToUserChanges(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Subscribe to real-time database changes
  const subscribeToUserChanges = (userId) => {
    // Subscribe to user_profiles changes
    const profileSubscription = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Profile changed:', payload);
          handleDataChange('profile', payload);
        }
      );

    // Subscribe to corporate_entities changes
    const corporateSubscription = supabase
      .channel('corporate-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'corporate_entities',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Corporate entity changed:', payload);
          handleDataChange('corporate', payload);
        }
      );

    // Subscribe to user_facilities changes
    const facilitiesSubscription = supabase
      .channel('facilities-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_facilities',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Facility changed:', payload);
          handleDataChange('facilities', payload);
        }
      );

    // Subscribe to all channels
    profileSubscription.subscribe();
    corporateSubscription.subscribe();
    facilitiesSubscription.subscribe();

    return () => {
      profileSubscription.unsubscribe();
      corporateSubscription.unsubscribe();
      facilitiesSubscription.unsubscribe();
    };
  };

  // Handle real-time data changes
  const handleDataChange = (dataType, payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    // Update local cache through data flow manager
    if (user?.id) {
      userDataFlowManager.refreshUserData(user.id);
    }

    // Show appropriate notification
    switch (eventType) {
      case 'INSERT':
        toast.success(`${dataType} data synchronized`);
        break;
      case 'UPDATE':
        // Only show notification for significant changes
        if (isSignificantChange(oldRecord, newRecord)) {
          toast.info(`${dataType} data updated`);
        }
        break;
      case 'DELETE':
        toast.warning(`${dataType} data removed`);
        break;
    }

    setLastSyncTime(new Date());
  };

  // Check if a change is significant enough to notify
  const isSignificantChange = (oldRecord, newRecord) => {
    if (!oldRecord || !newRecord) return true;

    // Define fields that matter for sync notifications
    const importantFields = [
      'full_name', 'email', 'phone', 'center_name',
      'corporate_name', 'tax_id', 'status',
      'facility_name', 'street_address', 'city', 'state'
    ];

    return importantFields.some(field => 
      oldRecord[field] !== newRecord[field]
    );
  };

  // Sync pending changes when coming back online
  const syncPendingChanges = async () => {
    if (!isOnline || !user?.id) return;

    setSyncStatus('syncing');
    
    try {
      // Force refresh user data to ensure everything is in sync
      await userDataFlowManager.refreshUserData(user.id);
      
      setSyncStatus('success');
      setPendingChanges(0);
      setLastSyncTime(new Date());
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  // Manual sync trigger
  const triggerSync = async () => {
    if (!isOnline) {
      toast.error('Cannot sync while offline');
      return;
    }

    await syncPendingChanges();
  };

  // Cross-component data sharing
  const broadcastDataUpdate = (component, data) => {
    // Emit custom event for other components to listen
    window.dispatchEvent(new CustomEvent('usrad-data-update', {
      detail: { component, data, timestamp: Date.now() }
    }));
  };

  // Listen for cross-component updates
  useEffect(() => {
    const handleDataUpdate = (event) => {
      const { component, data } = event.detail;
      
      // Refresh data flow manager cache
      if (user?.id) {
        userDataFlowManager.refreshUserData(user.id);
      }
    };

    window.addEventListener('usrad-data-update', handleDataUpdate);
    
    return () => {
      window.removeEventListener('usrad-data-update', handleDataUpdate);
    };
  }, [user?.id]);

  // Auto-sync on visibility change (tab focus)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isOnline && user?.id) {
        // Sync when tab becomes visible
        setTimeout(syncPendingChanges, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOnline, user?.id]);

  const contextValue = {
    isOnline,
    syncStatus,
    lastSyncTime,
    pendingChanges,
    triggerSync,
    broadcastDataUpdate
  };

  return (
    <DataSyncContext.Provider value={contextValue}>
      {children}
      
      {/* Sync Status Indicator */}
      <SyncStatusIndicator 
        isOnline={isOnline}
        syncStatus={syncStatus}
        lastSyncTime={lastSyncTime}
        onSync={triggerSync}
      />
    </DataSyncContext.Provider>
  );
};

// Sync Status Indicator Component
const SyncStatusIndicator = ({ isOnline, syncStatus, lastSyncTime, onSync }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (syncStatus !== 'idle') {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        );
      case 'success':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Syncing...';
      case 'success':
        return 'Synced';
      case 'error':
        return 'Sync failed';
      default:
        return isOnline ? 'Online' : 'Offline';
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return 'bg-gray-500';
    switch (syncStatus) {
      case 'syncing':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`
        fixed bottom-4 right-4 z-50 transition-all duration-300 
        ${isVisible || !isOnline ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg text-white text-sm
        ${getStatusColor()}
      `}>
        {getStatusIcon()}
        <span>{getStatusText()}</span>
        {lastSyncTime && syncStatus === 'idle' && isOnline && (
          <span className="text-xs opacity-75">
            {new Date(lastSyncTime).toLocaleTimeString()}
          </span>
        )}
        {syncStatus === 'error' && (
          <button 
            onClick={onSync}
            className="text-xs underline hover:no-underline ml-2"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default DataSyncProvider;