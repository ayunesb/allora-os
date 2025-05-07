var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Trigger webhook for strategy approval
 */
export function onStrategyApproved(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the webhook URL from localStorage (set in the ZapierWebhookSection component)
            const zapierWebhookUrl = localStorage.getItem("zapier_webhook_url");
            if (!zapierWebhookUrl) {
                console.warn("No Zapier webhook URL configured");
                return false;
            }
            // Send the webhook to Zapier
            yield fetch(zapierWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors", // Required for cross-origin requests to Zapier
                body: JSON.stringify({
                    event_type: "strategy_approved",
                    timestamp: new Date().toISOString(),
                    data: {
                        strategy_id: data.strategyId,
                        strategy_title: data.strategyTitle,
                        company_id: data.companyId,
                        approved_by: data.approvedBy,
                    },
                }),
            });
            console.log("Strategy approval event sent to Zapier");
            return true;
        }
        catch (error) {
            console.error("Failed to trigger strategy approval webhook:", error);
            return false;
        }
    });
}
/**
 * Trigger webhook for campaign creation
 */
export function onCampaignCreated(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const zapierWebhookUrl = localStorage.getItem("zapier_webhook_url");
            if (!zapierWebhookUrl) {
                console.warn("No Zapier webhook URL configured");
                return false;
            }
            yield fetch(zapierWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    event_type: "campaign_created",
                    timestamp: new Date().toISOString(),
                    data: {
                        campaign_id: data.campaignId,
                        campaign_title: data.campaignTitle,
                        platform: data.platform,
                        budget: data.budget,
                    },
                }),
            });
            console.log("Campaign creation event sent to Zapier");
            return true;
        }
        catch (error) {
            console.error("Failed to trigger campaign creation webhook:", error);
            return false;
        }
    });
}
/**
 * Trigger webhook for lead conversion
 */
export function onLeadConverted(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const zapierWebhookUrl = localStorage.getItem("zapier_webhook_url");
            if (!zapierWebhookUrl) {
                console.warn("No Zapier webhook URL configured");
                return false;
            }
            yield fetch(zapierWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    event_type: "lead_converted",
                    timestamp: new Date().toISOString(),
                    data: {
                        lead_id: data.leadId,
                        lead_name: data.leadName,
                        email: data.email,
                        company: data.company,
                        value: data.value,
                    },
                }),
            });
            console.log("Lead conversion event sent to Zapier");
            return true;
        }
        catch (error) {
            console.error("Failed to trigger lead conversion webhook:", error);
            return false;
        }
    });
}
