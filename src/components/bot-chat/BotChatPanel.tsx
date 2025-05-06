import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

type BotChatPanelProps = {
    children: React.ReactNode;
    variant?: "default" | "compact";
    size?: "small" | "medium" | "large";
};

const BotChatPanel: React.FC<BotChatPanelProps> = ({ children, variant = "default", size = "medium", botId, bot, selectedBot, onSelectBot, allBots }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    // Use botId if provided or use selectedBot if available
    const activeBotName = selectedBot?.name || bot?.name || 'Bot';
    const handleSend = () => {
        if (!message.trim())
            return;
        // Add user message to chat
        const userMessage = { id: Date.now().toString(), content: message, isUser: true };
        setChatHistory([...chatHistory, userMessage]);
        // Clear input
        setMessage('');
        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: `This is a response from ${activeBotName}`,
                isUser: false
            };
            setChatHistory(prev => [...prev, botMessage]);
        }, 1000);
    };
    return (<Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {activeBotName} {bot?.title ? `- ${bot.title}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pb-6">
        <div className="space-y-4">
          {chatHistory.map((msg) => (<div key={msg.id} className={`p-3 rounded-lg max-w-[80%] ${msg.isUser
                ? 'bg-primary text-primary-foreground ml-auto'
                : 'bg-muted text-muted-foreground'}`}>
              {msg.content}
            </div>))}
          {chatHistory.length === 0 && (<div className="text-center text-muted-foreground py-8">
              Start a conversation with {activeBotName}
            </div>)}
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1" onKeyDown={(e) => e.key === 'Enter' && handleSend()}/>
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4"/>
          </Button>
        </div>
      </div>
    </Card>);
};
export default BotChatPanel;
