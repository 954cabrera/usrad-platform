import { useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

interface UseAutoSaveOptions {
  onSave: (data: any) => Promise<boolean>;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave({ onSave, delay = 2000, enabled = true }: UseAutoSaveOptions) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedDataRef = useRef<string>('');
  const isSavingRef = useRef(false);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (data: any) => {
      if (!enabled || isSavingRef.current) return;

      const dataString = JSON.stringify(data);
      
      // Only save if data has changed
      if (dataString === lastSavedDataRef.current) {
        return;
      }

      isSavingRef.current = true;
      
      try {
        const success = await onSave(data);
        if (success) {
          lastSavedDataRef.current = dataString;
        }
      } catch (error) {
        console.error('Auto-save error:', error);
      } finally {
        isSavingRef.current = false;
      }
    }, delay),
    [onSave, delay, enabled]
  );

  // Trigger auto-save
  const triggerAutoSave = useCallback((data: any) => {
    if (!enabled) return;
    
    debouncedSave(data);
  }, [debouncedSave, enabled]);

  // Force save immediately
  const forceSave = useCallback(async (data: any) => {
    debouncedSave.cancel();
    
    const dataString = JSON.stringify(data);
    if (dataString === lastSavedDataRef.current) {
      return true;
    }

    isSavingRef.current = true;
    
    try {
      const success = await onSave(data);
      if (success) {
        lastSavedDataRef.current = dataString;
      }
      return success;
    } catch (error) {
      console.error('Force save error:', error);
      return false;
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, debouncedSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [debouncedSave]);

  return {
    triggerAutoSave,
    forceSave,
    isSaving: isSavingRef.current
  };
}