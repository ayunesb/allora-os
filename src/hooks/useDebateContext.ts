
import { useState } from 'react';
import { DebateSession } from '@/utils/consultation/types';
import { useAuth } from '@/context/AuthContext';

export default function useDebateContext() {
  const { profile } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Context variables shared between debate hooks
  return {
    sessionId,
    setSessionId,
    profile
  };
}
