import { DynamicTool } from "langchain/tools";
import { Client } from "@notionhq/client";

let notion: Client | null = null;

/**
 * Initialize the Notion client with API key
 */
export function initNotionClient(apiKey: string): void {
  if (!apiKey) {
    console.error("Notion API key is required");
    return;
  }
  notion = new Client({ auth: apiKey });
}

/**
 * Create a Notion tool for LangChain that can save content to a Notion database
 */
export function createNotionTool(databaseId: string) {
  return new DynamicTool({
    name: "NotionMemory",
    description:
      "Save a strategy or decision log into Notion with title and content.",
    func: async (input: string) => {
      try {
        if (!notion) {
          return "Notion client not initialized. Please set NOTION_API_KEY first.";
        }

        if (!databaseId) {
          return "Notion database ID not provided. Please set NOTION_DB_ID first.";
        }

        const [titleLine, ...bodyLines] = input.split("\n");
        const title = titleLine.trim();
        const content = bodyLines.join("\n").trim();

        const response = await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            Name: {
              title: [{ text: { content: title } }],
            },
          },
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content } }],
              },
            },
          ],
        });

        return `Logged to Notion: ${title}`;
      } catch (err) {
        console.error("NotionTool error:", err);
        return `Failed to log to Notion: ${err instanceof Error ? err.message : String(err)}`;
      }
    },
  });
}
