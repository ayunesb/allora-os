import React from 'react';
interface LeadScoreBadgeProps {
    score: 'hot' | 'warm' | 'cold';
    className?: string;
    showIcon?: boolean;
    pulsing?: boolean;
}
export declare const LeadScoreBadge: React.FC<LeadScoreBadgeProps>;
export {};
