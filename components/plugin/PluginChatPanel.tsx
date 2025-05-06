import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/types";
import Message from "./Message";
import { usePlugin } from "@/hooks/usePlugin";

const PluginChatPanel = (props: { pluginId: string }) => {
  const { pluginId } = props; // Explicitly type `pluginId`
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { plugin } = usePlugin(pluginId);
  const bottomRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = bottomRef.current as HTMLElement; // Fix `scrollIntoView` type error
    element.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      message: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/plugin-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.message, pluginId }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "agent",
          message: data.response.message,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t border-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="w-full p-2 border border-border rounded-lg"
          placeholder="Type a message..."
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default PluginChatPanel;
