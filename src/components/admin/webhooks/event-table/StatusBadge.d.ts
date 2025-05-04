import React from 'react';
interface StatusBadgeProps {
    status: 'success' | 'failed' | 'pending';
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
export default StatusBadge;
