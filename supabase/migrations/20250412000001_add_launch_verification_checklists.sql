
-- Create table for storing launch verification checklists
CREATE TABLE IF NOT EXISTS public.launch_verification_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  checklist_data JSONB NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add uniqueness constraint for company_id
ALTER TABLE public.launch_verification_checklists 
  DROP CONSTRAINT IF EXISTS launch_verification_checklists_company_id_key;
  
ALTER TABLE public.launch_verification_checklists 
  ADD CONSTRAINT launch_verification_checklists_company_id_key UNIQUE (company_id);

-- Create index for faster lookup by company_id
CREATE INDEX IF NOT EXISTS launch_verification_checklists_company_id_idx
  ON public.launch_verification_checklists (company_id);

-- Enable RLS
ALTER TABLE public.launch_verification_checklists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their company's checklist"
  ON public.launch_verification_checklists
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.company_id = launch_verification_checklists.company_id
    )
  );

CREATE POLICY "Users can insert their company's checklist"
  ON public.launch_verification_checklists
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.company_id = launch_verification_checklists.company_id
    )
  );

CREATE POLICY "Users can update their company's checklist"
  ON public.launch_verification_checklists
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.company_id = launch_verification_checklists.company_id
    )
  );
