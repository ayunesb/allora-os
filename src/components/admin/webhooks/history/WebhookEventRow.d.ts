import React from 'react';
import { WebhookEvent } from '@/types/unified-types';
interface WebhookEventRowProps {
    event: WebhookEvent;
    onViewDetail: () => void;
}
declare const WebhookEventRow: React.FC<WebhookEventRowProps>;
export default WebhookEventRow;
