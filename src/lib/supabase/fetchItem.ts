import { supabase } from "@/lib/supabase/client";

export async function fetchPluginById(id: string) {
  const { data, error } = await supabase
    .from("plugins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchStrategyById(id: string) {
  const { data, error } = await supabase
    .from("strategies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
