import { supabase } from "@/lib/supabase";

export async function logPluginExecution(
  pluginId: string,
  strategyId: string | null,
) {
  await supabase.from("plugin_logs").insert({
    plugin_id: pluginId,
    strategy_id: strategyId,
    context: "executed",
  });

  await supabase.rpc("increment_plugin_xp", { plugin_id: pluginId });
}
