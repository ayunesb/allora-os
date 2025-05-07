import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function logPluginEvent(session: any, pluginId: string) {
  const supabase = createClientComponentClient();

  await supabase.from("plugin_logs").insert({
    tenant_id: session.user.id, // or map from plugin if needed
    plugin_name: pluginId, // assuming this is a string name (not UUID)
    event: "chat_response",
    value: 5,
  });

  await supabase.rpc("evolve_plugin_agent_if_ready", {
    plugin_name: pluginId,
  });
}
