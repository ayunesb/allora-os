import { WebhookType } from "@/utils/webhookValidation";

/**
 * Webhook utilities for working with various webhook types
 */

export function getWebhookTemplateUrl(type: WebhookType): string {
  switch (type) {
    case "zapier":
      return "https://hooks.zapier.com/hooks/catch/";
    case "slack":
      return "https://hooks.slack.com/services/";
    case "github":
      return "https://api.github.com/repos/OWNER/REPO/dispatches";
    case "notion":
      return "https://api.notion.com/v1/";
    case "stripe":
      return "https://api.stripe.com/";
    case "custom":
    default:
      return "https://";
  }
}

export function getWebhookDefaultPayload(
  type: WebhookType,
): Record<string, unknown> {
  const basePayload = {
    timestamp: new Date().toISOString(),
    source: "Allora AI Platform",
    event_type: "test",
  };

  switch (type) {
    case "zapier":
      return {
        ...basePayload,
        data: { message: "Test webhook from Allora AI" },
      };
    case "slack":
      return {
        text: "Test notification from Allora AI",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Test Webhook*\nThis is a test notification from Allora AI platform.",
            },
          },
        ],
      };
    case "github":
      return {
        event_type: "test-webhook",
        client_payload: {
          ...basePayload,
          source: "Allora AI Platform",
        },
      };
    default:
      return basePayload;
  }
}

/**
 * Helper function to properly test webhooks with appropriate headers and payload
 */
export async function testWebhookAdvanced(
  url: string,
  type: WebhookType,
): Promise<{ success: boolean; message: string }> {
  if (!url) {
    return { success: false, message: "No URL provided" };
  }

  const payload = getWebhookDefaultPayload(type);

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: "Webhook test sent successfully",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
