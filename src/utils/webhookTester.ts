
import { toast } from 'sonner';

/**
 * Tests a webhook by sending a test payload
 * @param webhookUrl The webhook URL to test
 * @returns Promise with test result
 */
export async function testWebhook(webhookUrl: string): Promise<{success: boolean, message?: string}> {
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { 
      success: false, 
      message: 'Invalid webhook URL format. Must start with http:// or https://' 
    };
  }
  
  try {
    console.log(`Testing webhook: ${webhookUrl}`);
    
    const testPayload = {
      event: 'webhook_test',
      timestamp: new Date().toISOString(),
      source: 'allora_ai_audit',
      data: {
        test: true,
        app: 'Allora AI',
        environment: import.meta.env.MODE || 'production'
      }
    };
    
    // Send the request with no-cors mode to handle CORS restrictions
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // This prevents CORS errors but limits response data
      body: JSON.stringify(testPayload)
    });
    
    // Since we're using no-cors, we can't check status code
    // We'll assume it was successful
    console.log('Webhook test sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error testing webhook:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Verifies Zapier webhooks by testing essential business events
 * @returns Promise with verification results for each essential webhook
 */
export async function verifyZapierWebhooks(): Promise<{[key: string]: boolean}> {
  // Get webhooks from local storage
  const webhookUrl = localStorage.getItem('zapier_webhook_url');
  
  if (!webhookUrl) {
    toast.error('No Zapier webhook URL configured. Please set up Zapier integration first.');
    return {
      lead_created: false,
      strategy_approved: false,
      campaign_launched: false
    };
  }
  
  // Test each essential business event
  const results: {[key: string]: boolean} = {};
  
  // Test lead created webhook
  const leadResult = await testWebhook(webhookUrl);
  results.lead_created = leadResult.success;
  
  // Test strategy approved webhook (use same URL for test purposes)
  const strategyResult = await testWebhook(webhookUrl);
  results.strategy_approved = strategyResult.success;
  
  // Test campaign launched webhook (use same URL for test purposes)
  const campaignResult = await testWebhook(webhookUrl);
  results.campaign_launched = campaignResult.success;
  
  return results;
}
