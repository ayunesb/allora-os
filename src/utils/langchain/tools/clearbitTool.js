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
 * Initialize the Clearbit client with API key
 */
export function initClearbitClient(apiKey) {
    if (!apiKey) {
        console.error("Clearbit API key is required");
        return;
    }
    g.CLEARBIT_API_KEY = apiKey;
}
/**
 * Create a Clearbit tool for LangChain that can look up company and person information
 */
export function createClearbitTool() {
    return new DynamicTool({
        name: "ClearbitLookup",
        description: "Use this to enrich a lead or company using Clearbit (domain or email).",
        func: (input) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const apiKey = g.CLEARBIT_API_KEY;
                if (!apiKey) {
                    return "Clearbit client not initialized. Please set CLEARBIT_API_KEY first.";
                }
                const trimmed = input.trim().toLowerCase();
                // Company domain input (e.g., "notion.so")
                if (trimmed.includes(".") && !trimmed.includes("@")) {
                    const res = yield fetch(`https://company.clearbit.com/v2/companies/find?domain=${trimmed}`, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                        },
                    });
                    if (!res.ok)
                        return "Company not found.";
                    const data = yield res.json();
                    return `Company: ${data.name}\nIndustry: ${((_a = data.category) === null || _a === void 0 ? void 0 : _a.industry) || "Unknown"}\nSize: ${((_b = data.metrics) === null || _b === void 0 ? void 0 : _b.employees) || "Unknown"} employees\nLocation: ${data.location || "Unknown"}\nTags: ${((_c = data.tags) === null || _c === void 0 ? void 0 : _c.join(", ")) || "None"}`;
                }
                // Email input (e.g., "user@company.com")
                if (trimmed.includes("@")) {
                    const res = yield fetch(`https://person.clearbit.com/v2/people/find?email=${trimmed}`, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                        },
                    });
                    if (!res.ok)
                        return "Lead not found.";
                    const person = yield res.json();
                    return `Lead: ${((_d = person.name) === null || _d === void 0 ? void 0 : _d.fullName) || "Unknown"}\nTitle: ${person.title || "Unknown"}\nCompany: ${((_e = person.employment) === null || _e === void 0 ? void 0 : _e.name) || "Unknown"}\nLocation: ${person.location || "Unknown"}`;
                }
                return 'Please provide a company domain (e.g., "notion.so") or email (e.g., "jane@company.com").';
            }
            catch (err) {
                console.error("ClearbitTool error:", err);
                return `Failed to retrieve data from Clearbit: ${err instanceof Error ? err.message : String(err)}`;
            }
        }),
    });
}
