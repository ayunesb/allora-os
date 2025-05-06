import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface BotChatPanelProps {
  botId: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  bot: { name: string; title?: string }; // Fix type for bot property
  selectedBot: { name: string }; // Fix type for selectedBot property
  onSelectBot: (botId: string) => void;
  allBots: string[];
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const BotChatPanel: React.FC<BotChatPanelProps> = ({
  botId,
  isOpen,
  onClose,
  title,
  bot,
  selectedBot,
  onSelectBot,
  allBots,
}) => {
  if (!isOpen) return null;

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const activeBotName = selectedBot?.name || bot?.name || "Bot";

  const handleSend = (e?: React.FormEvent<HTMLFormElement>) => { // Allow optional event
    e?.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
    };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a response from ${activeBotName}`,
        isUser: false,
      };
      setChatHistory((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <aside className="bot-chat-panel">
      <header>
        <h2>{title || `Bot: ${botId}`}</h2>
        <button onClick={onClose}>Close</button>
      </header>
      <div className="chat-window">
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              {activeBotName} {bot?.title ? `- ${bot.title}` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto pb-6">
            <div className="space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.isUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {chatHistory.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Start a conversation with {activeBotName}
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSend()} // Fix event handling
              />
              <Button size="icon" onClick={() => handleSend()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default BotChatPanel;
