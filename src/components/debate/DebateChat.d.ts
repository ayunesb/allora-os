import React from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
interface DebateChatProps {
    debateTitle: string;
    debateObjective: string;
    messages: DebateMessage[];
    participants: DebateParticipant[];
    isLoading: boolean;
    onSendMessage: (e: React.FormEvent) => void;
    onSaveDebate: () => void;
    onExportDebate: () => void;
    onGenerateSummary: () => void;
    newMessage: string;
    onNewMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onVoteMessage: (messageId: string, vote: 1 | -1) => void;
    onToggleFavorite: (messageId: string) => void;
}
declare const DebateChat: React.FC<DebateChatProps>;
export default DebateChat;
