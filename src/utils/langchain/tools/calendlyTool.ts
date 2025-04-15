
import { DynamicTool } from "langchain/tools";

/**
 * Initialize the Calendly client with API key and user URI
 */
export function initCalendlyClient(apiKey: string, userUri: string): void {
  if (!apiKey || !userUri) {
    console.error("Calendly API key and user URI are required");
    return;
  }
  
  global.CALENDLY_API_KEY = apiKey;
  global.CALENDLY_USER_URI = userUri;
}

/**
 * Create a Calendly tool for LangChain that can check availability and schedule meetings
 */
export function createCalendlyTool() {
  return new DynamicTool({
    name: "CalendlyScheduler",
    description: "Check availability or schedule meetings via Calendly",
    func: async (input: string) => {
      try {
        const apiKey = global.CALENDLY_API_KEY;
        const userUri = global.CALENDLY_USER_URI;
        
        if (!apiKey || !userUri) {
          return "Calendly client not initialized. Please set CALENDLY_API_KEY and CALENDLY_USER_URI first.";
        }
        
        const normalized = input.toLowerCase();

        // Check availability
        if (normalized.includes('availability')) {
          const response = await fetch(`https://api.calendly.com/scheduling_links`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            return "Failed to fetch Calendly availability.";
          }

          const data = await response.json();
          const links = data.collection;
          if (!links || links.length === 0) {
            return 'No scheduling links found.';
          }

          return `Available booking links:\n${links.map((link: any) => 
            `- ${link.name}: ${link.booking_url}`).join('\n')}`;
        }

        // Schedule meeting (provide booking link)
        if (normalized.includes('schedule')) {
          const response = await fetch(`${userUri}/event_types`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            return "Failed to fetch Calendly event types.";
          }

          const data = await response.json();
          const eventTypes = data.collection;
          
          if (!eventTypes || eventTypes.length === 0) {
            return 'No event types found.';
          }

          return `Available meeting types:\n${eventTypes.map((event: any) => 
            `- ${event.name} (${event.duration} min): ${event.scheduling_url}`).join('\n')}`;
        }

        return 'Please specify "check availability" or "schedule a meeting".';
      } catch (err) {
        console.error('CalendlyTool error:', err);
        return `Failed to process Calendly request: ${err instanceof Error ? err.message : String(err)}`;
      }
    }
  });
}
