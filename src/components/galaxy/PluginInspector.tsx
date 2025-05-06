import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function PluginInspector({ plugin }) {
  const [pluginData, setPluginData] = useState(null);
  useEffect(() => {
    const supabase = createClientComponentClient();
    const fetchPluginData = async () => {
      const { data, error } = await supabase
        .from("plugin_card_with_xp")
        .select("*")
        .eq("id", plugin.id);
      if (error) {
        console.error("Error fetching plugin data:", error);
      } else {
        setPluginData(data[0]);
      }
    };
    fetchPluginData();
  }, [plugin.id]);
  if (!pluginData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="text-xl font-bold">{pluginData.name}</h2>
      <p className="text-sm text-muted-foreground">
        XP: {pluginData.total_xp} / 100
      </p>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${Math.min((pluginData.total_xp / 100) * 100, 100)}%`,
          }}
        />
      </div>
      {pluginData.total_xp >= 100 && (
        <span className="text-xs text-yellow-500 font-semibold animate-pulse">
          🧬 Ready to evolve
        </span>
      )}
    </div>
  );
}
