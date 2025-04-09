
-- Create a function to get user ID by email
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(user_email TEXT)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.profiles WHERE email = user_email LIMIT 1;
  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
