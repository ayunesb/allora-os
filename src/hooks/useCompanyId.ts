
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function useCompanyId(): string | undefined {
  const [companyId, setCompanyId] = useState<string | undefined>(undefined);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanyId = async () => {
      if (!user?.id) return;
      
      try {
        // First check if the user has a profile with tenant_id
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('tenant_id')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        if (profile?.tenant_id) {
          setCompanyId(profile.tenant_id);
          return;
        }

        // If no tenant_id in profile, check tenant_users table
        const { data: tenantUser, error: tenantError } = await supabase
          .from('tenant_users')
          .select('tenant_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (tenantError) {
          console.error('Error fetching tenant user:', tenantError);
          return;
        }

        if (tenantUser?.tenant_id) {
          setCompanyId(tenantUser.tenant_id);
          return;
        }
      } catch (error) {
        console.error('Error in useCompanyId:', error);
      }
    };

    fetchCompanyId();
  }, [user?.id]);

  return companyId;
}

export default useCompanyId;
