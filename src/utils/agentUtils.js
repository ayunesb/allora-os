var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/supabaseClient";
/**
 * Utilities for formatting and standardizing agent personalities and decision styles
 */
export const XP_THRESHOLDS = {
    v1: 100,
    v2: 250,
    v3: 500,
};
/**
 * Get a formatted decision style string based on the executive's style
 */
export function getDecisionStyle(style) {
    switch (style === null || style === void 0 ? void 0 : style.toLowerCase()) {
        case "analytical":
            return "You make decisions based on careful analysis of data and logical reasoning. You prefer quantitative evidence over qualitative inputs.";
        case "intuitive":
            return "You make decisions based on gut feelings and intuition. You trust your experience and instincts over pure data.";
        case "decisive":
            return "You make decisions quickly and confidently. You believe in fast execution and adapting along the way.";
        case "cautious":
            return "You make decisions carefully and methodically. You prefer to have all information possible before proceeding.";
        case "innovative":
            return "You make decisions that challenge the status quo. You look for creative, unconventional solutions.";
        case "collaborative":
            return "You make decisions through consensus building. You value input from diverse perspectives.";
        default:
            return "You make balanced decisions considering both data and intuition. You weigh risks carefully but are willing to pursue opportunities.";
    }
}
/**
 * Get a formatted personality string based on the executive's personality
 */
export function getPersonality(personality) {
    switch (personality === null || personality === void 0 ? void 0 : personality.toLowerCase()) {
        case "visionary":
            return "You are forward-thinking and optimistic about the future. You tend to focus on big ideas and long-term possibilities.";
        case "pragmatic":
            return "You are practical and focused on what works. You prefer concrete solutions over abstract theories.";
        case "challenger":
            return "You are direct and questioning. You challenge assumptions and push others to think differently.";
        case "diplomat":
            return "You are tactful and relationship-oriented. You focus on building consensus and maintaining harmony.";
        case "driver":
            return "You are results-oriented and focused on outcomes. You value efficiency, speed, and decisive action.";
        case "analytical":
            return "You are detail-oriented and thorough. You prefer working with data and facts rather than emotions or intuition.";
        default:
            return "You have a balanced personality that adapts to different situations appropriately.";
    }
}
export function applyAgentVote(agentId, vote) {
    return __awaiter(this, void 0, void 0, function* () {
        const delta = vote === "up" ? 10 : -5;
        const { data: agent, error } = yield supabase
            .from("agents")
            .select("*")
            .eq("id", agentId)
            .single();
        if (error || !agent) {
            console.error("Error fetching agent:", error);
            return;
        }
        const updatedXP = Math.max(0, agent.xp + delta);
        let newVersion = agent.version;
        for (const [version, threshold] of Object.entries(XP_THRESHOLDS)) {
            if (updatedXP >= threshold)
                newVersion = version;
        }
        const { error: updateError } = yield supabase
            .from("agents")
            .update({ xp: updatedXP, version: newVersion })
            .eq("id", agentId);
        if (updateError) {
            console.error("Error updating agent:", updateError);
        }
        return delta; // Ensure return in function
    });
}
