var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
// Get a response from the OpenAI API via Supabase Edge Function
export const getOpenAIResponse = (_a) => __awaiter(void 0, [_a], void 0, function* ({ role, prompt, }) {
    try {
        const { data, error } = yield supabase.functions.invoke("openai", {
            body: {
                role,
                prompt,
                model: "gpt-4o-mini",
            },
        });
        if (error) {
            console.error("Error getting OpenAI response:", error);
            return `Error: ${error.message}`;
        }
        return (data === null || data === void 0 ? void 0 : data.response) || "No response received";
    }
    catch (err) {
        console.error("Exception in getOpenAIResponse:", err);
        return `Error: ${err.message}`;
    }
});
// Run the executive agent in hybrid mode (AI response + optional tool execution)
export const runExecutiveAgentHybrid = (executivePrompt, executive) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Get executive's natural response (OpenAI)
    const aiText = yield getOpenAIResponse({
        role: executive,
        prompt: executivePrompt,
    });
    // Step 2: Determine if follow-up action is needed
    const needsExecution = /revenue|schedule|log to notion|check balance|transactions|marketing data|campaign|leads/i.test(aiText);
    let executionOutput = "";
    if (needsExecution) {
        try {
            // Get the API endpoint from localStorage
            const apiEndpoint = localStorage.getItem("langchain_api_endpoint");
            if (!apiEndpoint) {
                return (aiText +
                    "\n\n⚠️ No LangChain API endpoint configured. Tools execution not available.");
            }
            const response = yield fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: aiText,
                    context: { executive },
                }),
            });
            if (!response.ok) {
                throw new Error(`API error (${response.status}): ${yield response.text()}`);
            }
            const data = yield response.json();
            executionOutput = `\n\n🛠️ Executed: ${data.result || "No result returned"}`;
        }
        catch (err) {
            executionOutput = `\n\n❌ Error executing tools: ${err.message}`;
        }
    }
    return aiText + executionOutput;
});
