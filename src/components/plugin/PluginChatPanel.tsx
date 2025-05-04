import React, { useState, Suspense, useEffect } from 'react';
import GalaxyGraph from '@/components/galaxy/GalaxyGraph';
import InspectorSidebar from '@/components/galaxy/InspectorSidebar';
import PluginInspector from '@/components/galaxy/PluginInspector';
import PluginSkeleton from '@/components/galaxy/PluginSkeleton';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  message: string;
  created_at: string;
  agent_version_id?: string | null;
}

export default function GalaxyExplorer() {
  const router = useRouter();
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showXpBoost, setShowXpBoost] = useState(false);
  const chatEndRef = React.useRef(null);

  const handleNodeClick = (pluginNode) => {
    if (pluginNode.type === "plugin") {
      router.push(`/agents/performance?plugin=${pluginNode.name}`);
    }
    setSelectedPlugin(pluginNode);
    handleXpThreshold(pluginNode); // Check XP threshold on node click
  };

  const handleXpThreshold = async (pluginNode) => {
    const supabase = createClientComponentClient();
    try {
      const { data: pluginData, error: fetchError } = await supabase
        .from("plugin_card_with_xp")
        .select("total_xp, agent_version_id")
        .eq("id", pluginNode.id)
        .single();

      if (fetchError) {
        console.error("Error fetching plugin data:", fetchError);
        return;
      }

      if (pluginData.total_xp >= 100) {
        const newVersion = `v${parseInt(pluginData.agent_version_id?.slice(1) || "1") + 1}`;

        const { error: logError } = await supabase
          .from("agent_evolution_logs")
          .insert({
            agent_type: "plugin_assistant",
            from_version: pluginData.agent_version_id || "v1",
            to_version: newVersion,
          });

        if (logError) {
          console.error("Error logging evolution:", logError);
          return;
        }

        const { error: updateError } = await supabase
          .from("plugin_card_with_xp")
          .update({ agent_version_id: newVersion, total_xp: 0 }) // Reset XP
          .eq("id", pluginNode.id);

        if (updateError) {
          console.error("Error updating plugin version:", updateError);
        } else {
          console.log(`Plugin ${pluginNode.id} evolved to ${newVersion}`);
          confetti(); // Trigger confetti animation
          toast.success("🎉 Plugin assistant evolved to a new version!");
        }
      }
    } catch (err) {
      console.error("Error handling XP threshold:", err);
    }
  };

  useEffect(() => {
    const supabase = createClientComponentClient();

    const fetchChatLogs = async () => {
      const { data, error } = await supabase
        .from("plugin_card_with_xp")
        .select("*");

      if (error) {
        console.error("Error fetching chat logs:", error);
      } else {
        setMessages(data as ChatMessage[]);
      }
    };

    fetchChatLogs();
  }, []);

  const sendMessage = () => {
    // Implement send message logic
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-3/4">
        <GalaxyGraph onNodeClick={handleNodeClick} />
      </div>
      <div className="w-1/4 border-l border-border">
        {selectedPlugin ? (
          <>
            <button
              onClick={() => setSelectedPlugin(null)}
              className="mb-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg"
            >
              Reset Selection
            </button>
            <Suspense fallback={<PluginSkeleton />}>
              <PluginInspector plugin={selectedPlugin} />
            </Suspense>
          </>
        ) : (
          <InspectorSidebar />
        )}
      </div>
      <div className="flex flex-col h-full border border-muted rounded-xl p-3 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {messages.map((msg) => (
            <div className="flex items-start gap-2" key={msg.id}>
              {msg.sender === "agent" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] px-4 py-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-muted"
                }`}
              >
                <div>{msg.message}</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {new Date(msg.created_at).toLocaleTimeString()}{" "}
                  {msg.agent_version_id ? `• v${msg.agent_version_id}` : ""}
                </div>
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">
                  🧑
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="mr-auto text-xs text-muted-foreground animate-pulse">
              AI is thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {showXpBoost && (
          <div className="absolute top-4 right-4 animate-bounce text-green-500 text-sm font-semibold">
            +5 XP 💡
          </div>
        )}

        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the plugin something..."
            className="flex-1 border border-input rounded-lg px-3 py-2 text-sm bg-background"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}