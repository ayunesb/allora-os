
-- Fix the update_profile_after_company_creation function to include search_path
CREATE OR REPLACE FUNCTION public.update_profile_after_company_creation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE profiles 
  SET company_id = NEW.id
  WHERE id = auth.uid() AND company_id IS NULL;
  RETURN NEW;
END;
$function$;
