import { WebClient } from "@slack/web-api"; // Fixed import path
import { getSlackChannelId } from "./SlackUtils"; // Fixed import path
import { getUserById } from "./UserUtils"; // Fixed import path

export class WebhookUtils {
  private static webClient = new WebClient(process.env.SLACK_TOKEN);

  public static async sendSlackMessage(
    userId: string,
    message: string,
  ): Promise<void> {
    const user = await getUserById(userId);
    const slackChannelId = await getSlackChannelId(user.email);

    const payload = {
      channel: slackChannelId,
      text: message,
      payload: { id: "mock-id" },
    };

    await this.webClient.chat.postMessage(payload);
  }
}
