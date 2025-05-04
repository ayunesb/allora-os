import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
export default function useDebateContext() {
    const { profile } = useAuth();
    const [sessionId, setSessionId] = useState(null);
    // Context variables shared between debate hooks
    return {
        sessionId,
        setSessionId,
        profile
    };
}
