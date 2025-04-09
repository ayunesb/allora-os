
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
    RETURN '{"twoFactorEnabled": false, "extendedSessionTimeout": false}'::jsonb;
  END IF;
  
  RETURN settings;
END;
$$;
