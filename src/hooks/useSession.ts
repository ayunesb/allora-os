
import { useState, useCallback, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const updateLastActivity = useCallback(() => {
    setLastActivity(new Date());
    setIsSessionExpired(false);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      console.log('Manually refreshing session...');
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Error refreshing session:', error);
        return false;
      }
      
      if (data.session) {
        console.log('Session refreshed successfully');
        setSession(data.session);
        setIsSessionExpired(false);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in manual session refresh:', error);
      return false;
    }
  }, []);

  // Auto session refresh logic
  useEffect(() => {
    if (!session) return;
    
    const checkSessionRefresh = async () => {
      try {
        const expiresAt = session.expires_at;
        if (!expiresAt) return;
        
        const expiryTime = new Date(expiresAt * 1000);
        const now = new Date();
        const timeToExpiry = expiryTime.getTime() - now.getTime();
        
        // If session is about to expire in the next 5 minutes, refresh it
        if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
          console.log('Session expiring soon, refreshing...');
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('Error refreshing session:', error);
          } else if (data.session) {
            console.log('Session refreshed successfully');
            setSession(data.session);
          }
        }
        
        // If session is expired, set flag
        if (timeToExpiry <= 0) {
          console.log('Session expired');
          setIsSessionExpired(true);
          toast.error('Your session has expired. Please log in again.');
        }
      } catch (error) {
        console.error('Error in session refresh check:', error);
      }
    };
    
    const intervalId = setInterval(checkSessionRefresh, 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [session, lastActivity]);

  // Monitor user activity to prevent session timeouts
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateLastActivity();
    };
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [updateLastActivity]);

  return {
    session,
    setSession,
    isSessionExpired,
    isLoading,
    setIsLoading,
    refreshSession,
    updateLastActivity
  };
}
