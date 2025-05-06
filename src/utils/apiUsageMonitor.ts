import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { reportWarning } from "@/utils/monitoring";

export interface ApiUsageMetrics {
  totalApiCalls: number;
  openAiTokensUsed: number;
  strategyGenerations: number;
  campaignGenerations: number;
  scriptGenerations: number;
  aiDebateRuns: number;
  lastUpdated: Date;
}

export interface UsageLimits {
  tier: "starter" | "pro" | "enterprise";
  maxApiCalls: number;
  maxOpenAiTokens: number;
  maxStrategyGenerations: number;
  maxCampaignGenerations: number;
  maxScriptGenerations: number;
  maxAiDebateRuns: number;
}

const USAGE_TIER_LIMITS: Record<string, UsageLimits> = {
  starter: {
    tier: "starter",
    maxApiCalls: 1000,
    maxOpenAiTokens: 100000,
    maxStrategyGenerations: 10,
    maxCampaignGenerations: 10,
    maxScriptGenerations: 20,
    maxAiDebateRuns: 5,
  },
  pro: {
    tier: "pro",
    maxApiCalls: 5000,
    maxOpenAiTokens: 500000,
    maxStrategyGenerations: 50,
    maxCampaignGenerations: 50,
    maxScriptGenerations: 100,
    maxAiDebateRuns: 25,
  },
  enterprise: {
    tier: "enterprise",
    maxApiCalls: 999999, // Unlimited for practical purposes
    maxOpenAiTokens: 9999999,
    maxStrategyGenerations: 999,
    maxCampaignGenerations: 999,
    maxScriptGenerations: 999,
    maxAiDebateRuns: 999,
  },
};

/**
 * Records API usage for a specific company
 */
export async function recordApiUsage(
  companyId: string,
  usageType: keyof Omit<ApiUsageMetrics, "lastUpdated" | "totalApiCalls">,
  amount: number = 1,
): Promise<boolean> {
  try {
    // Always increment the total API calls
    const { data: usageData, error: fetchError } = await supabase
      .from("api_usage")
      .select("*")
      .eq("company_id", companyId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = not found
      console.error("Error fetching API usage:", fetchError);
      return false;
    }

    const newUsage = usageData || {
      company_id: companyId,
      total_api_calls: 0,
      openai_tokens_used: 0,
      strategy_generations: 0,
      campaign_generations: 0,
      script_generations: 0,
      ai_debate_runs: 0,
    };

    // Increment the total API calls
    newUsage.total_api_calls = (newUsage.total_api_calls || 0) + 1;

    // Increment the specific usage type
    const columnMap: Record<string, string> = {
      openAiTokensUsed: "openai_tokens_used",
      strategyGenerations: "strategy_generations",
      campaignGenerations: "campaign_generations",
      scriptGenerations: "script_generations",
      aiDebateRuns: "ai_debate_runs",
    };

    const columnName = columnMap[usageType];
    if (columnName) {
      // @ts-ignore - we know the column exists
      newUsage[columnName] = (newUsage[columnName] || 0) + amount;
    }

    // Upsert the usage record
    const { error: upsertError } = await supabase
      .from("api_usage")
      .upsert(newUsage);

    if (upsertError) {
      console.error("Error updating API usage:", upsertError);
      return false;
    }

    // Check for approaching limits
    await checkUsageLimits(companyId, newUsage);

    return true;
  } catch (error) {
    console.error("Error recording API usage:", error);
    return false;
  }
}

/**
 * Gets API usage for a specific company
 */
export async function getApiUsage(
  companyId: string,
): Promise<ApiUsageMetrics | null> {
  try {
    const { data, error } = await supabase
      .from("api_usage")
      .select("*")
      .eq("company_id", companyId)
      .single();

    if (error) {
      console.error("Error fetching API usage:", error);
      return null;
    }

    return {
      totalApiCalls: data.total_api_calls || 0,
      openAiTokensUsed: data.openai_tokens_used || 0,
      strategyGenerations: data.strategy_generations || 0,
      campaignGenerations: data.campaign_generations || 0,
      scriptGenerations: data.script_generations || 0,
      aiDebateRuns: data.ai_debate_runs || 0,
      lastUpdated: new Date(data.updated_at),
    };
  } catch (error) {
    console.error("Error getting API usage:", error);
    return null;
  }
}

/**
 * Checks if the company is approaching API usage limits
 */
async function checkUsageLimits(
  companyId: string,
  currentUsage: any,
): Promise<void> {
  try {
    // Get the company's subscription tier
    const { data: companyData, error: companyError } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("company_id", companyId)
      .single();

    if (companyError) {
      console.error("Error fetching company subscription tier:", companyError);
      return;
    }

    const tier = companyData?.subscription_tier || "starter";
    const limits = USAGE_TIER_LIMITS[tier];

    // Check each limit
    const approachingLimits: string[] = [];
    const warningThreshold = 0.8; // 80% of limit

    // Check API calls
    if (currentUsage.total_api_calls >= limits.maxApiCalls * warningThreshold) {
      approachingLimits.push(
        `API calls (${currentUsage.total_api_calls}/${limits.maxApiCalls})`,
      );
    }

    // Check OpenAI tokens
    if (
      currentUsage.openai_tokens_used >=
      limits.maxOpenAiTokens * warningThreshold
    ) {
      approachingLimits.push(
        `OpenAI tokens (${currentUsage.openai_tokens_used}/${limits.maxOpenAiTokens})`,
      );
    }

    // Check strategy generations
    if (
      currentUsage.strategy_generations >=
      limits.maxStrategyGenerations * warningThreshold
    ) {
      approachingLimits.push(
        `Strategy generations (${currentUsage.strategy_generations}/${limits.maxStrategyGenerations})`,
      );
    }

    // Check campaign generations
    if (
      currentUsage.campaign_generations >=
      limits.maxCampaignGenerations * warningThreshold
    ) {
      approachingLimits.push(
        `Campaign generations (${currentUsage.campaign_generations}/${limits.maxCampaignGenerations})`,
      );
    }

    // Check script generations
    if (
      currentUsage.script_generations >=
      limits.maxScriptGenerations * warningThreshold
    ) {
      approachingLimits.push(
        `Script generations (${currentUsage.script_generations}/${limits.maxScriptGenerations})`,
      );
    }

    // Check AI debate runs
    if (
      currentUsage.ai_debate_runs >=
      limits.maxAiDebateRuns * warningThreshold
    ) {
      approachingLimits.push(
        `AI debate runs (${currentUsage.ai_debate_runs}/${limits.maxAiDebateRuns})`,
      );
    }

    // If any limits are approaching, notify admins and suggest upgrade
    if (approachingLimits.length > 0) {
      // Log a system alert
      reportWarning(
        "API Usage Limit Approaching",
        `Company ${companyId} is approaching usage limits: ${approachingLimits.join(", ")}`,
        { companyId, tier, currentUsage, limits },
      );

      // Store notification for admins
      await supabase.from("admin_notifications").insert({
        type: "usage_limit",
        title: "API Usage Limit Approaching",
        message: `Company is approaching usage limits: ${approachingLimits.join(", ")}`,
        company_id: companyId,
        metadata: { usageData: currentUsage, tier, limits },
      });

      // If threshold is exceeded, suggest upgrade
      if (currentUsage.total_api_calls >= limits.maxApiCalls * 0.9) {
        suggestUpgrade(companyId, tier);
      }
    }
  } catch (error) {
    console.error("Error checking usage limits:", error);
  }
}

/**
 * Suggests an upgrade to the next tier
 */
async function suggestUpgrade(
  companyId: string,
  currentTier: string,
): Promise<void> {
  try {
    // Get next tier
    const nextTier = currentTier === "starter" ? "pro" : "enterprise";

    // Create an upgrade suggestion notification
    await supabase.from("user_notifications").insert({
      type: "upgrade_suggestion",
      title: "Upgrade Suggested",
      message: `You're approaching your ${currentTier} plan limits. Consider upgrading to ${nextTier} for increased capacity.`,
      company_id: companyId,
      action_link: "/pricing",
      action_text: "View Upgrade Options",
    });

    // Log the suggestion
    console.log(
      `Upgrade suggested for company ${companyId}: ${currentTier} -> ${nextTier}`,
    );
  } catch (error) {
    console.error("Error suggesting upgrade:", error);
  }
}

/**
 * Gets usage summary for admin dashboard
 */
export async function getUsageSummary(): Promise<Record<string, any>[]> {
  try {
    const { data, error } = await supabase
      .from("api_usage")
      .select(
        `
        *,
        companies:company_id(name)
      `,
      )
      .order("total_api_calls", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching usage summary:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error getting usage summary:", error);
    return [];
  }
}
