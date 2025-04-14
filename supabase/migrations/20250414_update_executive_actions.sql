
-- Add executive_name and executive_role columns to executive_actions
ALTER TABLE public.executive_actions
ADD COLUMN IF NOT EXISTS executive_name TEXT,
ADD COLUMN IF NOT EXISTS executive_role TEXT,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;
