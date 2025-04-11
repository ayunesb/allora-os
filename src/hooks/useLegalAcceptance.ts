
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface LegalAcceptanceStatus {
  hasAcceptedLegal: boolean;
  isCheckingStatus: boolean;
  showLegalModal: boolean;
  closeLegalModal: () => void;
  acceptLegalTerms: () => Promise<boolean>;
  retryAcceptance: () => Promise<boolean>;
}

export function useLegalAcceptance(user: User | null): LegalAcceptanceStatus {
  const [hasAcceptedLegal, setHasAcceptedLegal] = useState<boolean>(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(true);
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [acceptanceError, setAcceptanceError] = useState<string | null>(null);

  const checkAcceptanceStatus = useCallback(async (userId: string) => {
    try {
      setIsCheckingStatus(true);
      console.log("Checking legal acceptance status for user:", userId);
      
      const { data, error } = await supabase
        .from('user_legal_acceptances')
        .select('*')
        .eq('user_id', userId)
        .order('accepted_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // PGRST116 is "no rows returned" - this means the user hasn't accepted yet
        if (error.code !== 'PGRST116') {
          console.error('Error checking legal acceptance status:', error);
          throw error;
        }
        
        // User hasn't accepted terms yet
        setHasAcceptedLegal(false);
        setShowLegalModal(true);
        return false;
      }

      // Check if they've accepted all required terms
      if (data) {
        const allAccepted = data.terms_of_service && data.privacy_policy && data.messaging_consent;
        setHasAcceptedLegal(allAccepted);
        setShowLegalModal(!allAccepted);
        return allAccepted;
      } else {
        // No acceptance record found
        setHasAcceptedLegal(false);
        setShowLegalModal(true);
        return false;
      }
    } catch (error) {
      console.error('Error checking legal acceptance:', error);
      setHasAcceptedLegal(false);
      setShowLegalModal(true);
      return false;
    } finally {
      setIsCheckingStatus(false);
    }
  }, []);

  // Check acceptance status when user changes
  useEffect(() => {
    if (!user) {
      setIsCheckingStatus(false);
      return;
    }

    checkAcceptanceStatus(user.id);
  }, [user, checkAcceptanceStatus]);

  const closeLegalModal = () => {
    setShowLegalModal(false);
  };

  const acceptLegalTerms = async (): Promise<boolean> => {
    setAcceptanceError(null);
    
    if (!user) {
      setAcceptanceError("User not authenticated");
      return false;
    }
    
    try {
      // We don't need to implement the actual acceptance logic here,
      // as it's handled in the LegalAcceptanceModal component
      setHasAcceptedLegal(true);
      setShowLegalModal(false);
      return true;
    } catch (error) {
      console.error("Error in acceptLegalTerms:", error);
      setAcceptanceError(error instanceof Error ? error.message : "Unknown error");
      return false;
    }
  };

  const retryAcceptance = async (): Promise<boolean> => {
    if (!user) return false;
    return checkAcceptanceStatus(user.id);
  };

  return {
    hasAcceptedLegal,
    isCheckingStatus,
    showLegalModal,
    closeLegalModal,
    acceptLegalTerms,
    retryAcceptance
  };
}
