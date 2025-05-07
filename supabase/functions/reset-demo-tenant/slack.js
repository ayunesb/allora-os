var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Helper function to send Slack alerts
export function sendSlackAlert(message_1) {
    return __awaiter(this, arguments, void 0, function* (message, severity = "info") {
        try {
            const webhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
            if (!webhookUrl) {
                console.error("No Slack webhook URL configured");
                return false;
            }
            // Create emoji based on severity
            let emoji = "📊";
            if (severity === "warning")
                emoji = "⚠️";
            if (severity === "error")
                emoji = "🔥";
            // Send request to webhook
            const response = yield fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: `${emoji} *Allora AI Alert*: ${message}`,
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: `${emoji} *Allora AI Alert*\n${message}`,
                            },
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "mrkdwn",
                                    text: `*Severity:* ${severity} | *Time:* ${new Date().toISOString()}`,
                                },
                            ],
                        },
                    ],
                }),
            });
            if (!response.ok) {
                throw new Error(`Slack API responded with ${response.status}`);
            }
            return true;
        }
        catch (error) {
            console.error("Error sending Slack alert:", error);
            return false;
        }
    });
}
