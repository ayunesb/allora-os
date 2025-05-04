ALTER TABLE public.agent_evolution_logs
ADD COLUMN IF NOT EXISTS triggered_by_plugin TEXT;

-- Add a trigger function to set a default value for triggered_by_plugin
CREATE OR REPLACE FUNCTION set_default_triggered_by_plugin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.triggered_by_plugin IS NULL THEN
    NEW.triggered_by_plugin := 'default_plugin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for the agent_evolution_logs table
CREATE TRIGGER set_triggered_by_plugin
BEFORE INSERT ON public.agent_evolution_logs
FOR EACH ROW
EXECUTE FUNCTION set_default_triggered_by_plugin();
