import { toast } from 'sonner';
export const testZapierWebhook = async (webhookUrl) => {
    try {
        if (!webhookUrl || !webhookUrl.startsWith('https://hooks.zapier.com/')) {
            return {
                success: false,
                message: 'Invalid Zapier webhook URL',
                statusCode: 400
            };
        }
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors', // Required for CORS issues with Zapier
            body: JSON.stringify({
                test: true,
                timestamp: new Date().toISOString(),
                source: 'Allora AI Platform',
            }),
        });
        // Due to no-cors mode, we can't actually check the response status
        // So we'll assume it went through if no error was thrown
        return {
            success: true,
            message: 'Webhook test sent to Zapier',
            statusCode: 200
        };
    }
    catch (error) {
        console.error('Error testing Zapier webhook:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            statusCode: 500
        };
    }
};
export const triggerZapierWebhook = async (webhookUrl, data = {}) => {
    try {
        if (!webhookUrl) {
            toast.error('No Zapier webhook URL provided');
            return {
                success: false,
                message: 'No webhook URL provided',
                statusCode: 400
            };
        }
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
            }),
        });
        toast.success('Event sent to Zapier');
        return {
            success: true,
            message: 'Webhook triggered successfully',
            statusCode: 200
        };
    }
    catch (error) {
        console.error('Error triggering Zapier webhook:', error);
        toast.error('Failed to trigger Zapier webhook');
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to trigger webhook',
            statusCode: 500
        };
    }
};
export const triggerBusinessEvent = async (webhookUrl, eventType, data) => {
    return triggerZapierWebhook(webhookUrl, {
        eventType,
        ...data,
    });
};
