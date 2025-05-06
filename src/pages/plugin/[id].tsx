import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
export default function PluginDetailPage() {
  const { id } = useParams();
  const [plugin, setPlugin] = useState(null);
  useEffect(() => {
    if (id) {
      async function fetchPlugin() {
        const { data } = await supabase
          .from("plugins")
          .select("*")
          .eq("id", id)
          .single();
        setPlugin(data);
      }
      fetchPlugin();
    }
  }, [id]);
  if (!plugin) return <div className="p-4 text-white">Loading...</div>;
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">{plugin.name}</h1>
      <p>{plugin.description}</p>
    </div>
  );
}
