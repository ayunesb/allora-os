
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface LegalAcceptanceStatus {
  hasAcceptedLegal: boolean;
  isCheckingStatus: boolean;
  showLegalModal: boolean;
  closeLegalModal: () => void;
  acceptLegalTerms: () => void;
}

export function useLegalAcceptance(user: User | null): LegalAcceptanceStatus {
  const [hasAcceptedLegal, setHasAcceptedLegal] = useState<boolean>(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(true);
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setIsCheckingStatus(false);
      return;
    }

    async function checkAcceptanceStatus() {
      try {
        const { data, error } = await supabase
          .from('user_legal_acceptances')
          .select('*')
          .eq('user_id', user.id)
          .order('accepted_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          console.error('Error checking legal acceptance status:', error);
          throw error;
        }

        if (data) {
          // User has already accepted all required terms
          if (data.terms_of_service && data.privacy_policy && data.messaging_consent) {
            setHasAcceptedLegal(true);
          } else {
            // User has a record but hasn't accepted all terms
            setHasAcceptedLegal(false);
            setShowLegalModal(true);
          }
        } else {
          // No acceptance record found
          setHasAcceptedLegal(false);
          setShowLegalModal(true);
        }
      } catch (error) {
        console.error('Error checking legal acceptance:', error);
        setHasAcceptedLegal(false);
        setShowLegalModal(true);
      } finally {
        setIsCheckingStatus(false);
      }
    }

    checkAcceptanceStatus();
  }, [user]);

  const closeLegalModal = () => {
    setShowLegalModal(false);
  };

  const acceptLegalTerms = () => {
    setHasAcceptedLegal(true);
    setShowLegalModal(false);
  };

  return {
    hasAcceptedLegal,
    isCheckingStatus,
    showLegalModal,
    closeLegalModal,
    acceptLegalTerms,
  };
}
