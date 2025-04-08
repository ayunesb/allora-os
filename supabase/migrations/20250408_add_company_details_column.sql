
-- Add a JSONB column to the companies table for storing detailed company information
ALTER TABLE IF EXISTS public.companies ADD COLUMN IF NOT EXISTS details JSONB;

-- Update the Column comment
COMMENT ON COLUMN public.companies.details IS 'Detailed company information including mission, vision, products, team, etc.';
