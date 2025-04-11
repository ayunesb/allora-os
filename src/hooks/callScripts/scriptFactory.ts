
import { CallScript } from "./types";
import { generateScriptContent, generateMessageContent } from "./scriptGenerators";
import { InsightType } from "@/components/bot-insights/BotInsightCard";

/**
 * Creates AI-generated scripts from company insights
 */
export const createAiGeneratedScripts = (
  insights: any[], 
  companyName?: string, 
  industry?: string
): CallScript[] => {
  // Filter for call script insights
  const callScriptInsights = insights.filter(insight => insight.type === "call_script" as InsightType);
  
  // Generate call scripts from insights
  const aiGeneratedCallScripts = callScriptInsights.map(insight => ({
    id: insight.id,
    title: insight.title,
    target: `${insight.primaryBot.name}'s Recommendations`,
    duration: "4-5 min",
    status: "Ready" as const,
    content: insight.description || generateScriptContent(
      insight.title, 
      insight.primaryBot.name, 
      insight.primaryBot.role, 
      companyName
    ),
    aiGenerated: true,
    primaryBot: insight.primaryBot,
    collaborators: insight.collaborators,
    type: 'call' as const
  }));
  
  // Generate complementary message scripts
  const aiGeneratedMessageScripts: CallScript[] = aiGeneratedCallScripts.map(script => ({
    id: `${script.id}-message`,
    title: `Follow-up for: ${script.title}`,
    target: script.target,
    duration: "1-2 min",
    status: "Ready",
    content: generateMessageContent(script.title, script.target, industry || "Technology"),
    aiGenerated: true,
    primaryBot: script.primaryBot,
    collaborators: script.collaborators,
    type: 'message' as const
  }));
  
  return [...aiGeneratedCallScripts, ...aiGeneratedMessageScripts];
};
