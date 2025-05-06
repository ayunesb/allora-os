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
import { Client } from "@notionhq/client";
let notion = null;
/**
 * Initialize the Notion client with API key
 */
export function initNotionClient(apiKey) {
    if (!apiKey) {
        console.error("Notion API key is required");
        return;
    }
    notion = new Client({ auth: apiKey });
}
/**
 * Create a Notion tool for LangChain that can save content to a Notion database
 */
export function createNotionTool(databaseId) {
    return new DynamicTool({
        name: "NotionMemory",
        description: "Save a strategy or decision log into Notion with title and content.",
        func: (input) => __awaiter(this, void 0, void 0, function* () {
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
                const response = yield notion.pages.create({
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
            }
            catch (err) {
                console.error("NotionTool error:", err);
                return `Failed to log to Notion: ${err instanceof Error ? err.message : String(err)}`;
            }
        }),
    });
}
