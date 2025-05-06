import React from "react";
interface MessageInputProps {
  botName: string;
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onRetry?: () => void;
  onClear?: () => void;
  error: string | null;
  canRetry?: boolean;
}
declare const MessageInput: React.FC<MessageInputProps>;
export default MessageInput;
