import React from 'react';
import { DebateParticipant } from '@/utils/consultation/types';
interface ParticipantsListProps {
    participants: DebateParticipant[];
    onEditParticipants: () => void;
}
declare const ParticipantsList: React.FC<ParticipantsListProps>;
export default ParticipantsList;
