import { WebClient } from '@slack/web-api'; // Ensure @slack/web-api is installed
import SlackUtils from './SlackUtils'; // Ensure './SlackUtils' exists
import UserUtils from './UserUtils'; // Ensure './UserUtils' exists

export class WebhookUtils {
  private static webClient = new WebClient(process.env.SLACK_TOKEN);

  public static async sendSlackMessage(userId: string, message: string): Promise<void> {
    const user = await getUserById(userId);
    const channelId = await getSlackChannelId(user.email);

    const payload = {
      channel: channelId,
      text: message,
      payload: { id: 'mock-id' },
    };

    await this.webClient.chat.postMessage(payload);
  }
}