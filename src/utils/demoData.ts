import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const createDemoDebate = async (companyId: string) => {
  if (!companyId) {
    toast.error("No company ID provided");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("ai_boardroom_debates")
      .insert({
        company_id: companyId,
        topic: "Expanding into international markets",
        summary:
          "The executive team debated the pros and cons of expanding our operations into European and Asian markets in the next fiscal year.",
        executives: [
          {
            id: "exec-1",
            name: "Elon Musk",
            role: "ceo",
            title: "CEO",
            stance: "support",
          },
          {
            id: "exec-2",
            name: "Warren Buffett",
            role: "cfo",
            title: "CFO",
            stance: "caution",
          },
          {
            id: "exec-3",
            name: "Satya Nadella",
            role: "coo",
            title: "COO",
            stance: "support",
          },
          {
            id: "exec-4",
            name: "Sheryl Sandberg",
            role: "cmo",
            title: "CMO",
            stance: "neutral",
          },
          {
            id: "exec-5",
            name: "Jeff Bezos",
            role: "strategy",
            title: "Chief Strategy Officer",
            stance: "support",
          },
        ],
        discussion: [
          {
            speaker: "Elon Musk",
            message:
              "I believe we should aggressively expand into European markets first, then Asia. Our product has proven success domestically, and these markets represent significant untapped potential.",
          },
          {
            speaker: "Warren Buffett",
            message:
              "While I see the opportunity, I have concerns about the capital requirements. European expansion will require significant upfront investment with uncertain payback periods.",
          },
          {
            speaker: "Satya Nadella",
            message:
              "From an operations perspective, we can leverage our existing infrastructure with minimal modifications for Europe. Asia would require more substantial adaptations to local regulations.",
          },
          {
            speaker: "Sheryl Sandberg",
            message:
              "Our brand resonates well with European consumers based on our market research. However, we need to consider cultural adaptations for our marketing strategy in Asian markets.",
          },
          {
            speaker: "Jeff Bezos",
            message:
              "I propose a phased approach: establish our presence in key European markets in Q2, learn from that experience, then prepare for Asian market entry in Q4.",
          },
          {
            speaker: "Elon Musk",
            message:
              "I agree with a phased approach, but we should move quickly. Our competitors are already making inroads in these territories.",
          },
          {
            speaker: "Warren Buffett",
            message:
              "If we take this approach, I recommend setting clear performance metrics and being prepared to adjust our investment if results don't meet expectations.",
          },
        ],
        conclusion:
          "The executive team reached a consensus to proceed with a phased international expansion, beginning with three key European markets in Q2, followed by preliminary operations in two Asian markets in Q4, contingent on successful European performance metrics.",
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    toast.success("Demo boardroom debate created successfully");
    return data.id;
  } catch (err: any) {
    console.error("Error creating demo debate:", err);
    toast.error(`Failed to create demo debate: ${err.message}`);
    return null;
  }
};

export const addDemoDataButton = async (
  companyId: string | null | undefined,
) => {
  if (!companyId) {
    const { data } = await supabase
      .from("companies")
      .select("id")
      .limit(1)
      .single();

    if (data) {
      companyId = data.id;
    } else {
      toast.error("No companies found in the database");
      return;
    }
  }

  if (!companyId) throw new Error("companyId is required");
  await createDemoDebate(companyId);

  window.location.reload();

  return {
    success: true,
    data: null,
  };
};
