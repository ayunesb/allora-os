
// Helper function to send Slack alerts
export async function sendSlackAlert(
  message: string,
  severity: 'info' | 'warning' | 'error' = 'info'
): Promise<boolean> {
  try {
    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    
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
