import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, RefreshCw, Trash2, Keyboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const MessageInput = ({
  botName,
  isLoading,
  onSendMessage,
  onRetry,
  onClear,
  error,
  canRetry = false,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const maxLength = 1000; // Set a reasonable character limit
  // Auto focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Ctrl+Enter or Cmd+Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (message.trim() && !isLoading) {
          onSendMessage(message);
          setMessage("");
        }
      }
      // Escape to clear input
      if (
        e.key === "Escape" &&
        document.activeElement === textareaRef.current
      ) {
        setMessage("");
      }
    };
    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => window.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [message, isLoading, onSendMessage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const getCharacterCountColor = () => {
    const percent = (message.length / maxLength) * 100;
    if (percent < 70) return "text-muted-foreground";
    if (percent < 90) return "text-amber-500";
    return "text-destructive";
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-grow relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${botName} a question...`}
            className="flex-grow resize-none min-h-[60px] max-h-[150px] pr-16"
            disabled={isLoading}
            aria-label="Your message"
            aria-describedby={error ? "message-error" : undefined}
            maxLength={maxLength}
          />
          <div
            className={`absolute bottom-2 right-3 text-xs ${getCharacterCountColor()}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {message.length}/{maxLength}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim() || isLoading}
                  aria-label="Send message"
                  className="h-[60px] w-[60px] relative transition-all duration-200 ease-in-out"
                  data-sending={isLoading}
                >
                  <SendIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <div className="flex flex-col">
                  <p>Send message</p>
                  <span className="text-xs opacity-80 mt-1">Ctrl+Enter</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Keyboard shortcuts info */}
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground"
              >
                <Keyboard className="h-3 w-3 mr-1" />
                <span>Shortcuts</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs space-y-1">
                <p>
                  <span className="font-medium">Enter:</span> Send message
                </p>
                <p>
                  <span className="font-medium">Shift+Enter:</span> New line
                </p>
                <p>
                  <span className="font-medium">Ctrl/⌘+Enter:</span> Send
                  message
                </p>
                <p>
                  <span className="font-medium">Esc:</span> Clear input
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Action buttons for retry and clear */}
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
                    className="h-7"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
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
                    className="h-7"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
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
      </div>

      {error && (
        <p id="message-error" className="text-destructive text-sm mt-1">
          {error}
        </p>
      )}
    </form>
  );
};
export default MessageInput;
