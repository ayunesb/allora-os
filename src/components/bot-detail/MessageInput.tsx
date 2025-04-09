
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
  botName: string;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ botName, isLoading, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Textarea
        placeholder={`Ask ${botName} anything...`}
        className="min-h-[60px] flex-grow"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button 
        onClick={handleSendMessage} 
        size="icon" 
        className="h-[60px] w-[60px] flex-shrink-0"
        disabled={!inputMessage.trim() || isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput;
