import React from 'react';
import { DebateMessage as DebateMessageType, DebateParticipant } from '@/utils/consultation/types';
interface DebateMessageProps {
    message: DebateMessageType;
    participants: DebateParticipant[];
    onVote?: (messageId: string, increment: boolean) => void;
    onToggleFavorite?: (messageId: string) => void;
}
declare const DebateMessage: React.FC<DebateMessageProps>;
export default DebateMessage;
