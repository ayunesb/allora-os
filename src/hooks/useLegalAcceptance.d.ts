import { User } from '@supabase/supabase-js';
interface LegalAcceptanceStatus {
    hasAcceptedLegal: boolean;
    isCheckingStatus: boolean;
    showLegalModal: boolean;
    closeLegalModal: () => void;
    acceptLegalTerms: () => Promise<boolean>;
    retryAcceptance: () => Promise<boolean>;
}
export declare function useLegalAcceptance(user: User | null): LegalAcceptanceStatus;
export {};
