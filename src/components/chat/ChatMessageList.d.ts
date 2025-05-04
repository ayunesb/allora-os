import React from 'react';
import { Message } from '@/types/fixed/Message';
interface ChatMessageListProps {
    messages: Message[];
    isTyping?: boolean;
    onClearChat: () => void;
}
export declare const ChatMessageList: React.FC<ChatMessageListProps>;
export {};
