import React from 'react';
import { Message } from './MessageType';
interface MessageListProps {
    messages: Message[];
}
declare const MessageList: React.FC<MessageListProps>;
export default MessageList;
