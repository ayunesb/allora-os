import React from 'react';
interface ManualTriggerContentProps {
    webhookUrl: string;
    onTrigger: () => void;
    isLoading: boolean;
    isTriggering?: string | null;
}
declare const ManualTriggerContent: React.FC<ManualTriggerContentProps>;
export default ManualTriggerContent;
