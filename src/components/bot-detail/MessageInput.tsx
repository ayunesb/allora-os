
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, RefreshCw, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MessageInputProps {
  botName: string;
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onRetry?: () => void;
  onClear?: () => void;
  error: string | null;
  canRetry?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  botName,
  isLoading,
  onSendMessage,
  onRetry,
  onClear,
  error,
  canRetry = false,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask ${botName} a question...`}
          className="flex-grow resize-none min-h-[60px] max-h-[150px]"
          disabled={isLoading}
          aria-label="Your message"
          aria-describedby={error ? "message-error" : undefined}
        />
        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim() || isLoading}
                  aria-label="Send message"
                  className="h-[60px] w-[60px]"
                >
                  <SendIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Action buttons for retry and clear */}
      {(onRetry || onClear) && (
        <div className="flex gap-2 justify-end">
          {onRetry && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    disabled={isLoading || !canRetry}
                    aria-label="Retry last message"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Retry last message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {onClear && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onClear}
                    disabled={isLoading}
                    aria-label="Clear conversation"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
      
      {error && (
        <p id="message-error" className="text-destructive text-sm mt-1">
          {error}
        </p>
      )}
    </form>
  );
};

export default MessageInput;
