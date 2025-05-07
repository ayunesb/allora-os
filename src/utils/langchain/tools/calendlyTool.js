var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DynamicTool } from "langchain/tools";
const g = global;
/**
 * Initialize the Calendly client with API key and user URI
 */
export function initCalendlyClient(apiKey, userUri) {
    if (!apiKey || !userUri) {
        console.error("Calendly API key and user URI are required");
        return;
    }
    g.CALENDLY_API_KEY = apiKey;
    g.CALENDLY_USER_URI = userUri;
}
/**
 * Create a Calendly tool for LangChain that can check availability and schedule meetings
 */
export function createCalendlyTool() {
    return new DynamicTool({
        name: "CalendlyScheduler",
        description: "Check availability or schedule meetings via Calendly",
        func: (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = g.CALENDLY_API_KEY;
                const userUri = g.CALENDLY_USER_URI;
                if (!apiKey || !userUri) {
                    return "Calendly client not initialized. Please set CALENDLY_API_KEY and CALENDLY_USER_URI first.";
                }
                const normalized = input.toLowerCase();
                // Check availability
                if (normalized.includes("availability")) {
                    const response = yield fetch(`https://api.calendly.com/scheduling_links`, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        return "Failed to fetch Calendly availability.";
                    }
                    const data = yield response.json();
                    const links = data.collection;
                    if (!links || links.length === 0) {
                        return "No scheduling links found.";
                    }
                    return `Available booking links:\n${links
                        .map((link) => `- ${link.name}: ${link.booking_url}`)
                        .join("\n")}`;
                }
                // Schedule meeting (provide booking link)
                if (normalized.includes("schedule")) {
                    const response = yield fetch(`${userUri}/event_types`, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        return "Failed to fetch Calendly event types.";
                    }
                    const data = yield response.json();
                    const eventTypes = data.collection;
                    if (!eventTypes || eventTypes.length === 0) {
                        return "No event types found.";
                    }
                    return `Available meeting types:\n${eventTypes
                        .map((event) => `- ${event.name} (${event.duration} min): ${event.scheduling_url}`)
                        .join("\n")}`;
                }
                return 'Please specify "check availability" or "schedule a meeting".';
            }
            catch (err) {
                console.error("CalendlyTool error:", err);
                return `Failed to process Calendly request: ${err instanceof Error ? err.message : String(err)}`;
            }
        }),
    });
}
