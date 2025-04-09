
import { useState, useEffect } from 'react';
import { getInitialParticipants } from '@/backend/debateManager';
import { DebateParticipant } from '@/utils/consultation/types';

export default function useDebateParticipants() {
  const [participants, setParticipants] = useState<DebateParticipant[]>([]);

  // Initialize participants from executive bots
  useEffect(() => {
    const initialParticipants = getInitialParticipants(4);
    setParticipants(initialParticipants);
  }, []);

  return {
    participants,
    setParticipants
  };
}
