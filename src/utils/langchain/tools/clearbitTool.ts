
import { DynamicTool } from "langchain/tools";

/**
 * Initialize the Clearbit client with API key
 */
export function initClearbitClient(apiKey: string): void {
  if (!apiKey) {
    console.error("Clearbit API key is required");
    return;
  }
  
  global.CLEARBIT_API_KEY = apiKey;
}

/**
 * Create a Clearbit tool for LangChain that can look up company and person information
 */
export function createClearbitTool() {
  return new DynamicTool({
    name: "ClearbitLookup",
    description: "Use this to enrich a lead or company using Clearbit (domain or email).",
    func: async (input: string) => {
      try {
        const apiKey = global.CLEARBIT_API_KEY;
        
        if (!apiKey) {
          return "Clearbit client not initialized. Please set CLEARBIT_API_KEY first.";
        }
        
        const trimmed = input.trim().toLowerCase();

        // Company domain input (e.g., "notion.so")
        if (trimmed.includes('.') && !trimmed.includes('@')) {
          const res = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${trimmed}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          });

          if (!res.ok) return 'Company not found.';
          const data = await res.json();

          return `Company: ${data.name}\nIndustry: ${data.category?.industry || 'Unknown'}\nSize: ${data.metrics?.employees || 'Unknown'} employees\nLocation: ${data.location || 'Unknown'}\nTags: ${data.tags?.join(', ') || 'None'}`;
        }

        // Email input (e.g., "user@company.com")
        if (trimmed.includes('@')) {
          const res = await fetch(`https://person.clearbit.com/v2/people/find?email=${trimmed}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          });

          if (!res.ok) return 'Lead not found.';
          const person = await res.json();

          return `Lead: ${person.name?.fullName || 'Unknown'}\nTitle: ${person.title || 'Unknown'}\nCompany: ${person.employment?.name || 'Unknown'}\nLocation: ${person.location || 'Unknown'}`;
        }

        return 'Please provide a company domain (e.g., "notion.so") or email (e.g., "jane@company.com").';
      } catch (err) {
        console.error('ClearbitTool error:', err);
        return `Failed to retrieve data from Clearbit: ${err instanceof Error ? err.message : String(err)}`;
      }
    }
  });
}
