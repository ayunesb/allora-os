import React from 'react';
import { BusinessEventType } from '@/hooks/useZapier';
interface BusinessEventContentProps {
    webhookUrl: string;
    onTrigger: (eventType: BusinessEventType, payload: Record<string, any>) => void;
    isLoading: boolean;
    isTriggering?: string | null;
}
declare const BusinessEventContent: React.FC<BusinessEventContentProps>;
export default BusinessEventContent;
