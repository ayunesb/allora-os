
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if a user has completed the onboarding process
 */
export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  try {
    if (!userId) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('company, industry')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Consider onboarding completed if user has both company name and industry set
    return !!(data?.company && data?.industry);
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}
