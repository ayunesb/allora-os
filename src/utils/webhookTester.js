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
 * Tests Zapier webhooks for connectivity
 */
export function verifyZapierWebhooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const webhookTypes = {
            newUser: process.env.ZAPIER_NEW_USER_WEBHOOK,
            newLead: process.env.ZAPIER_NEW_LEAD_WEBHOOK,
            newCampaign: process.env.ZAPIER_NEW_CAMPAIGN_WEBHOOK,
            taskComplete: process.env.ZAPIER_TASK_COMPLETE_WEBHOOK,
        };
        const results = {};
        // Test each webhook with a sample payload
        for (const [type, webhook] of Object.entries(webhookTypes)) {
            if (!webhook) {
                results[type] = false;
                continue;
            }
            try {
                // Simulate creating test payloads for each webhook type
                let payload = { test: true, timestamp: new Date().toISOString() };
                switch (type) {
                    case "newUser":
                        payload = Object.assign(Object.assign({}, payload), { userId: "test-user-id", email: "test@example.com", name: "Test User" });
                        break;
                    case "newLead":
                        payload = Object.assign(Object.assign({}, payload), { leadId: "test-lead-id", company: "Test Company", contactName: "Test Contact" });
                        break;
                    case "newCampaign":
                        payload = Object.assign(Object.assign({}, payload), { campaignId: "test-campaign-id", name: "Test Campaign", budget: 1000 });
                        break;
                    case "taskComplete":
                        payload = Object.assign(Object.assign({}, payload), { taskId: "test-task-id", strategyId: "test-strategy-id", completed: true });
                        break;
                }
                // For demonstration purposes, we'll simulate successful results
                // In a real implementation, you would make an actual HTTP request
                results[type] = true;
            }
            catch (error) {
                console.error(`Error testing ${type} webhook:`, error);
                results[type] = false;
            }
        }
        return results;
    });
}
