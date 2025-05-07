var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "../supabase";
// Generate an AI summary of a debate (now using OpenAI)
export const generateDebateSummary = (debateTitle, messages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Format messages for the summary
        const formattedMessages = messages.map((msg) => ({
            role: msg.senderId === "user" ? "user" : "assistant",
            name: msg.sender,
            content: msg.content,
        }));
        // Call the OpenAI edge function for summary
        const { data, error } = yield supabase.functions.invoke("openai", {
            body: {
                prompt: `Analyze this executive debate on "${debateTitle}" and provide: 
        1. 4 key insights (one sentence each)
        2. 4 strategic recommendations (one sentence each)
        3. 4 next steps (one sentence each)
        Format the response as JSON with three arrays: key_insights, recommendations, and next_steps.`,
                messages: formattedMessages,
            },
        });
        if (error) {
            throw new Error(`Edge function error: ${error.message}`);
        }
        // Try to parse the response as JSON
        try {
            // If the response is already parsed JSON
            if (typeof data.content === "object") {
                return {
                    key_insights: data.content.key_insights || [],
                    recommendations: data.content.recommendations || [],
                    next_steps: data.content.next_steps || [],
                };
            }
            // If the response is a string, try to extract JSON from it
            const jsonMatch = data.content.match(/```json([\s\S]*?)```/) ||
                data.content.match(/{[\s\S]*?}/);
            const jsonStr = jsonMatch
                ? jsonMatch[0].replace(/```json|```/g, "")
                : data.content;
            const parsedData = JSON.parse(jsonStr);
            return {
                key_insights: parsedData.key_insights || [],
                recommendations: parsedData.recommendations || [],
                next_steps: parsedData.next_steps || [],
            };
        }
        catch (parseError) {
            console.error("Error parsing AI summary:", parseError);
            // Fall back to mock data
            return {
                key_insights: [
                    "Focus on aligning strategy with long-term vision and mission",
                    "Prioritize initiatives with clear ROI and metrics for success",
                    "Balance short-term wins with long-term positioning",
                    "Consider customer insights and market trends in decision-making",
                ],
                recommendations: [
                    "Develop a comprehensive roadmap with phased implementation",
                    "Establish clear metrics to measure success and ROI",
                    "Create cross-functional teams to ensure holistic implementation",
                    "Regularly review and adjust based on market feedback",
                ],
                next_steps: [
                    "Schedule follow-up meeting to assign responsibilities",
                    "Prepare detailed implementation plan with timelines",
                    "Develop communication strategy for stakeholders",
                    "Set up regular review cycles to track progress",
                ],
            };
        }
    }
    catch (error) {
        console.error("Error generating debate summary:", error);
        // Return mock data on error
        return {
            key_insights: [
                "Focus on aligning strategy with long-term vision and mission",
                "Prioritize initiatives with clear ROI and metrics for success",
                "Balance short-term wins with long-term positioning",
                "Consider customer insights and market trends in decision-making",
            ],
            recommendations: [
                "Develop a comprehensive roadmap with phased implementation",
                "Establish clear metrics to measure success and ROI",
                "Create cross-functional teams to ensure holistic implementation",
                "Regularly review and adjust based on market feedback",
            ],
            next_steps: [
                "Schedule follow-up meeting to assign responsibilities",
                "Prepare detailed implementation plan with timelines",
                "Develop communication strategy for stakeholders",
                "Set up regular review cycles to track progress",
            ],
        };
    }
});
