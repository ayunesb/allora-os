import { useState, useCallback, useEffect, useRef } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        
        // Set up the next refresh
        scheduleRefresh(data.session);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in manual session refresh:', error);
      return false;
    }
  }, []);

  // Helper function to schedule session refresh
  const scheduleRefresh = useCallback((currentSession: Session | null) => {
    if (!currentSession) return;
    
    // Clear any existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    const expiresAt = currentSession.expires_at;
    if (!expiresAt) return;
    
    const expiryTime = new Date(expiresAt * 1000);
    const now = new Date();
    const timeToExpiry = expiryTime.getTime() - now.getTime();
    
    // If session is about to expire in the next 5 minutes, refresh it soon
    if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshSession();
      }, 10000); // Refresh in 10 seconds
    } 
    // Otherwise schedule refresh for 5 minutes before expiry
    else if (timeToExpiry > 5 * 60 * 1000) {
      const refreshTime = timeToExpiry - (5 * 60 * 1000);
      refreshTimeoutRef.current = setTimeout(() => {
        refreshSession();
      }, refreshTime);
    }
    // If session is expired, set flag
    else if (timeToExpiry <= 0) {
      console.log('Session expired');
      setIsSessionExpired(true);
      toast.error('Your session has expired. Please log in again.');
    }
  }, [refreshSession]);

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

  // Set up auth state change listener and initialize auth
  useEffect(() => {
    // Clean up function to clear any timeouts on unmount
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Initialize auth state and set up listener
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        
        // Update session state immediately
        setSession(newSession);
        
        // Schedule session refresh if needed
        scheduleRefresh(newSession);
        
        // Set session expired flag appropriately
        if (event === 'SIGNED_OUT') {
          setIsSessionExpired(false);
        } else if (newSession) {
          setIsSessionExpired(false);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setSession(currentSession);
        scheduleRefresh(currentSession);
      } catch (error: any) {
        console.error('Error loading auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [scheduleRefresh]);

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
