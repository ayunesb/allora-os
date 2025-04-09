
-- RPC function to get company integrations
CREATE OR REPLACE FUNCTION public.get_company_integrations(p_company_id UUID)
RETURNS TABLE(id UUID, company_id UUID, integration_ids JSONB, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT ci.id, ci.company_id, ci.integration_ids, ci.created_at
  FROM public.company_integrations ci
  WHERE ci.company_id = p_company_id;
END;
$$;

-- RPC function to update company integrations
CREATE OR REPLACE FUNCTION public.update_company_integrations(p_company_id UUID, p_integration_ids JSONB)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.company_integrations
  SET integration_ids = p_integration_ids
  WHERE company_id = p_company_id;
END;
$$;

-- RPC function to insert company integrations
CREATE OR REPLACE FUNCTION public.insert_company_integrations(p_company_id UUID, p_integration_ids JSONB)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.company_integrations (company_id, integration_ids)
  VALUES (p_company_id, p_integration_ids);
END;
$$;
