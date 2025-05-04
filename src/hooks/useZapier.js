import { useState } from 'react';
export const useZapier = () => {
    const [isLoading, setIsLoading] = useState(false);
    const testWebhook = async (webhookUrl) => {
        setIsLoading(true);
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
                body: JSON.stringify({
                    event: 'test_webhook',
                    timestamp: new Date().toISOString(),
                    source: window.location.origin
                }),
            });
            // Since mode is no-cors, we can't actually check the response status
            // We'll assume success but warn the user
            setIsLoading(false);
            return {
                success: true,
                message: 'Webhook test request sent. Please check your Zapier account to confirm it was received.'
            };
        }
        catch (error) {
            console.error('Error testing webhook:', error);
            setIsLoading(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                error
            };
        }
    };
    const triggerBusinessEvent = async (webhookUrl, eventType, payload) => {
        setIsLoading(true);
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
                body: JSON.stringify({
                    event: eventType,
                    timestamp: new Date().toISOString(),
                    data: payload
                }),
            });
            // Due to no-cors mode, we assume success
            setIsLoading(false);
            return {
                success: true,
                message: 'Event triggered successfully'
            };
        }
        catch (error) {
            console.error('Error triggering business event:', error);
            setIsLoading(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                error
            };
        }
    };
    return {
        isLoading,
        testWebhook,
        triggerBusinessEvent,
    };
};
export default useZapier;
