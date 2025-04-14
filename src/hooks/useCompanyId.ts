
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * A hook to reliably access the current user's company ID
 * Prioritizes profile data but falls back to localStorage and attempts to validate
 */
export function useCompanyId(): string | undefined {
  const { profile, isProfileLoading, user } = useAuth();
  const [validatedCompanyId, setValidatedCompanyId] = useState<string | undefined>(undefined);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Function to validate if a company ID exists in the database
    const validateCompanyId = async (companyId: string) => {
      if (!companyId) return false;
      
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('id')
          .eq('id', companyId)
          .single();
        
        return !error && data;
      } catch (err) {
        console.error("Error validating company ID:", err);
        return false;
      }
    };

    const getAndValidateCompanyId = async () => {
      // Skip if already validating or if we already have a validated ID
      if (isValidating || validatedCompanyId) return;
      
      setIsValidating(true);
      
      try {
        // First check if profile has a company_id
        if (!isProfileLoading && profile?.company_id) {
          const isValid = await validateCompanyId(profile.company_id);
          if (isValid) {
            setValidatedCompanyId(profile.company_id);
            console.log("Using company ID from profile:", profile.company_id);
            setIsValidating(false);
            return;
          }
        }
        
        // Then check localStorage
        const storedCompanyId = localStorage.getItem('allora_company_id');
        if (storedCompanyId) {
          const isValid = await validateCompanyId(storedCompanyId);
          if (isValid) {
            setValidatedCompanyId(storedCompanyId);
            console.log("Using company ID from localStorage:", storedCompanyId);
            
            // If we have a user but their profile doesn't have this company ID, update it
            if (user && profile && !profile.company_id) {
              const { error } = await supabase
                .from('profiles')
                .update({ company_id: storedCompanyId })
                .eq('id', user.id);
                
              if (error) {
                console.error("Error updating profile with company ID:", error);
              } else {
                console.log("Updated user profile with company ID");
              }
            }
            
            setIsValidating(false);
            return;
          }
        }
        
        // If we get here, we couldn't find a valid company ID
        // Try to find any company associated with this user
        if (user) {
          const { data, error } = await supabase
            .from('companies')
            .select('id')
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (!error && data && data.length > 0) {
            const companyId = data[0].id;
            setValidatedCompanyId(companyId);
            localStorage.setItem('allora_company_id', companyId);
            console.log("Found company ID from database:", companyId);
            
            // Update user profile with this company ID
            if (profile) {
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ company_id: companyId })
                .eq('id', user.id);
                
              if (updateError) {
                console.error("Error updating profile with found company ID:", updateError);
              }
            }
          } else {
            console.log("No companies found for this user:", error);
          }
        }
      } catch (err) {
        console.error("Error in company ID validation:", err);
      } finally {
        setIsValidating(false);
      }
    };
    
    getAndValidateCompanyId();
  }, [isProfileLoading, profile, user, isValidating, validatedCompanyId]);
  
  // Return priority: validated ID > profile ID > localStorage ID
  if (validatedCompanyId) {
    return validatedCompanyId;
  }
  
  if (!isProfileLoading && profile?.company_id) {
    return profile.company_id;
  }
  
  const storedCompanyId = localStorage.getItem('allora_company_id');
  if (storedCompanyId) {
    return storedCompanyId;
  }
  
  return undefined;
}
