import { DebateSession, DebateMessage } from "@/utils/consultation/types";
import { supabase } from "../supabase";
import { toast } from "sonner";

// Save a debate session to the database (mock implementation)
export const saveDebateSession = async (
  session: Omit<DebateSession, "id" | "created_at">,
): Promise<string | null> => {
  try {
    // In a real implementation, this would save to the Supabase database
    console.log("Would save debate session:", session);

    // For now, just return a mock ID
    const sessionId = `debate-${Date.now()}`;
    toast.success("Debate session saved successfully");

    return sessionId;
  } catch (error: any) {
    console.error("Error saving debate session:", error.message);
    toast.error(`Failed to save debate: ${error.message}`);
    return null;
  }
};

// Export a function to get debate sessions for a company (mock implementation)
export const getCompanyDebateSessions = async (
  companyId: string,
): Promise<DebateSession[]> => {
  try {
    // In a real implementation, this would fetch from the Supabase database
    // For now, return mock data
    return [];
  } catch (error: any) {
    console.error("Error fetching debate sessions:", error.message);
    return [];
  }
};
