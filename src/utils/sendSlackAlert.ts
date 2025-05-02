
import { supabase } from '@/integrations/supabase/client';

/**
 * Send an alert to a Slack webhook
 * @param message The message to send
 * @param severity Optional severity level (info, warning, error)
 * @returns Success status
 */
export async function sendSlackAlert(
  message: string, 
  severity: 'info' | 'warning' | 'error' = 'info'
): Promise<boolean> {
  try {
    // Get webhook URL from tenant settings or environment variable
    const { data: settings } = await supabase
      .from('tenant_settings')
      .select('slack_webhook_url')
      .single();
    
    const webhookUrl = settings?.slack_webhook_url || process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('No Slack webhook URL configured');
      return false;
    }
    
    // Create emoji based on severity
    let emoji = '📊';
    if (severity === 'warning') emoji = '⚠️';
    if (severity === 'error') emoji = '🔥';
    
    // Send request to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `${emoji} *Allora AI Alert*: ${message}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${emoji} *Allora AI Alert*\n${message}`
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `*Severity:* ${severity} | *Time:* ${new Date().toISOString()}`
              }
            ]
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Slack API responded with ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending Slack alert:', error);
    return false;
  }
}

/**
 * Helper function to wrap operations with Slack error reporting
 * @param operation Function to execute
 * @param errorMessage Error message to send to Slack if the operation fails
 * @returns Result of the operation
 */
export async function withSlackErrorReporting<T>(
  operation: () => Promise<T>,
  errorMessage = 'Operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : 'Unknown error';
    await sendSlackAlert(`${errorMessage}: ${errorDetails}`, 'error');
    throw error;
  }
}
