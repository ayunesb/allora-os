import React from 'react';
interface DebateContentProps {
    topic: string;
    summary: string;
    discussion: Array<{
        speaker: string;
        message: string;
    }>;
    conclusion: string;
    onStartNewDebate: () => void;
}
export declare const DebateContent: React.FC<DebateContentProps>;
export {};
