import type { NextApiRequest, NextApiResponse } from "next";

// Type definitions
type Message = {
  sender: "user" | "agent";
  message: string;
  pluginId: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, pluginId }: Message = req.body;

  if (!message || !pluginId) {
    return res.status(400).json({ error: "Missing message or pluginId" });
  }

  // TODO: Add Supabase insert for chat logs (optional)
  // await supabase.from('plugin_chat_logs').insert([...])

  // Mock AI response (replace this block with OpenAI API logic if needed)
  const agentReply = `Got it! Simulating response for plugin "${pluginId}". You said: "${message}"`;

  // Simulate latency
  await new Promise((r) => setTimeout(r, 800));

  return res.status(200).json({
    response: {
      sender: "agent",
      message: agentReply,
    },
  });
}
