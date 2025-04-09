
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessageInputProps {
  botName: string;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  error?: string | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  botName, 
  isLoading, 
  onSendMessage, 
  error = null 
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  
  // Auto-focus textarea on desktop
  useEffect(() => {
    if (!isMobile && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isMobile]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;
    
    try {
      onSendMessage(inputMessage);
      setInputMessage("");
      
      // Show visual feedback when message is sent
      toast.success("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {error && (
        <div className="mb-2 p-2 bg-destructive/10 text-destructive rounded-md text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex items-center gap-2 w-full">
        <Textarea
          ref={textareaRef}
          placeholder={`Ask ${botName} anything...`}
          className="min-h-[60px] flex-grow"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label={`Message to ${botName}`}
          aria-describedby="message-instructions"
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon" 
          className={`h-[60px] w-[60px] flex-shrink-0 transition-all duration-200 ${
            isLoading ? "bg-primary/70" : inputMessage.trim() ? "bg-primary hover:bg-primary/90" : "bg-primary/50"
          }`}
          disabled={!inputMessage.trim() || isLoading}
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>
      <span className="sr-only" id="message-instructions">
        Type your message and press Enter to send. Use Shift+Enter for a new line.
      </span>
    </div>
  );
};

export default MessageInput;
