
-- Create table for tracking executive resource point history
CREATE TABLE IF NOT EXISTS public.executive_resource_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  executive_id UUID NOT NULL REFERENCES public.executives(id),
  resource_points INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.executive_resource_history ENABLE ROW LEVEL SECURITY;

-- Add an updated_at column to executives table if it doesn't exist
ALTER TABLE public.executives
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add trigger to update updated_at timestamp on executives table
CREATE OR REPLACE FUNCTION public.update_executives_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_executives_updated_at
BEFORE UPDATE ON public.executives
FOR EACH ROW
EXECUTE FUNCTION public.update_executives_updated_at();

-- Add promotions column to executives table for tracking career development
ALTER TABLE public.executives
ADD COLUMN IF NOT EXISTS promotions INTEGER NOT NULL DEFAULT 0;
