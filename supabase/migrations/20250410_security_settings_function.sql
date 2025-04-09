
-- Create a function to retrieve security settings
CREATE OR REPLACE FUNCTION public.get_security_settings()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  settings jsonb;
BEGIN
  SELECT value INTO settings
  FROM public.system_settings
  WHERE key = 'security_settings';
  
  -- Return empty default settings if none found
  IF settings IS NULL THEN
    RETURN '{"twoFactorEnabled": false, "extendedSessionTimeout": false, "strictContentSecurity": false, "enhancedApiProtection": false}'::jsonb;
  END IF;
  
  RETURN settings;
END;
$$;

-- Create a function to update security settings
CREATE OR REPLACE FUNCTION public.update_security_settings(p_settings jsonb)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.system_settings 
  SET 
    value = p_settings,
    updated_at = now()
  WHERE key = 'security_settings';
  
  -- If no row was updated, insert a new one
  IF NOT FOUND THEN
    INSERT INTO public.system_settings (key, value)
    VALUES ('security_settings', p_settings);
  END IF;
  
  -- Log the security settings change
  INSERT INTO public.audit_logs (
    event_type, 
    user_id, 
    details, 
    ip_address
  )
  VALUES (
    'security_settings_updated',
    auth.uid(),
    p_settings,
    inet_client_addr()
  );
  
  RETURN true;
END;
$$;

-- Create an index on system_settings to improve query performance
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings (key);
