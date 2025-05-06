import { useState, useCallback } from "react";
import { DebateMessage } from "@/utils/consultation/types";

export function useMessageOperations() {
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addMessage = useCallback((message: DebateMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const addSystemMessage = useCallback(
    (content: string) => {
      const systemMessage: DebateMessage = {
        id: `msg-${Date.now()}`,
        sender: "System",
        senderId: "system",
        content,
        timestamp: new Date(),
        isUser: false,
        votes: 0,
        isFavorite: false,
      };

      addMessage(systemMessage);
      return systemMessage;
    },
    [addMessage],
  );

  const voteMessage = useCallback((messageId: string, increment: boolean) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              votes: (message.votes || 0) + (increment ? 1 : -1),
            }
          : message,
      ),
    );
  }, []);

  const toggleFavorite = useCallback((messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, isFavorite: !message.isFavorite }
          : message,
      ),
    );

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(messageId)) {
        return prevFavorites.filter((id) => id !== messageId);
      } else {
        return [...prevFavorites, messageId];
      }
    });
  }, []);

  return {
    messages,
    favorites,
    isLoading,
    setIsLoading,
    setMessages,
    addMessage,
    addSystemMessage,
    voteMessage,
    toggleFavorite,
  };
}
