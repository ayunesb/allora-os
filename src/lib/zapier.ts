
/**
 * Zapier Integration Helper
 * Enables triggering automation workflows via Zapier webhooks
 */

export const triggerZap = async (event: string, payload: Record<string, any>) => {
  try {
    // In production, you would use an environment variable for the webhook URL
    const ZAPIER_WEBHOOK_URL = "YOUR_ZAPIER_WEBHOOK_URL";
    
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        event, 
        payload,
        timestamp: new Date().toISOString() 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error triggering Zapier webhook:", error);
    return { success: false, error };
  }
};
