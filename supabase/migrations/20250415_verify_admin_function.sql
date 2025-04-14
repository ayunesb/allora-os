
-- Function to verify admin status
CREATE OR REPLACE FUNCTION public.verify_admin_status()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role text;
BEGIN
  -- Check if the user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  -- Get the user's role from the profiles table
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid();
  
  -- Return true if the user is an admin
  RETURN user_role = 'admin';
END;
$$;

-- Create audit log entry for admin verification
CREATE OR REPLACE FUNCTION public.log_admin_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    event_type,
    user_id,
    details,
    ip_address
  ) VALUES (
    'admin_verification',
    auth.uid(),
    jsonb_build_object('successful', NEW),
    inet_client_addr()
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for admin verification
CREATE TRIGGER on_admin_verification
  AFTER SELECT ON public.verify_admin_status()
  FOR EACH STATEMENT EXECUTE FUNCTION public.log_admin_verification();
