import React from 'react';
interface WebhookHeaderProps {
    activeTab: string;
    onTabChange: (value: string) => void;
}
declare const WebhookHeader: React.FC<WebhookHeaderProps>;
export default WebhookHeader;
