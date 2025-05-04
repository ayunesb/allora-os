import React from 'react';
import { WebhookEvent } from '@/types/unified-types';
interface WebhookEventDetailModalProps {
    event: WebhookEvent;
    isOpen: boolean;
    onClose: () => void;
}
declare const WebhookEventDetailModal: React.FC<WebhookEventDetailModalProps>;
export default WebhookEventDetailModal;
