
-- Check if profiles table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Check if email column exists in profiles table
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'email'
    ) THEN
      -- Add email column if it doesn't exist
      ALTER TABLE public.profiles ADD COLUMN email TEXT;
      
      -- Add a comment explaining the column purpose
      COMMENT ON COLUMN public.profiles.email IS 'User email address for backup reference and easier queries';
    END IF;
  END IF;
END
$$;

-- Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Backfill existing profiles with emails from auth.users (requires admin privileges)
-- This would typically be done in a separate admin-executed script
-- or through a Supabase Edge Function with service role key
