import { describe, it, expect, vi, beforeEach } from "vitest";
import { runExecutiveAgent } from "@/agents/executiveAgent";
import { v4 as uuidv4 } from "uuid";

// Mock uuid to return a consistent value
vi.mock("uuid", () => ({
  v4: () => "test-uuid-1234",
}));

// Mock the supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({
        data: {
          content: JSON.stringify({
            options: ["Option A", "Option B"],
            selectedOption: "Option A",
            reasoning: "Because it is better",
            riskAssessment: "Low risk",
            priority: "high",
          }),
        },
        error: null,
      }),
    },
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: "test-user-id",
          },
        },
      }),
    },
  },
}));

// Mock the saveExecutiveDecision function
vi.mock("./executiveMemory", () => ({
  saveExecutiveDecision: vi.fn().mockResolvedValue(true),
  getExecutiveDecisions: vi.fn().mockResolvedValue([]),
}));

describe("runExecutiveAgent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a decision when successful", async () => {
    const task = "Test task";
    const executiveProfile = { name: "Test Executive", role: "CEO" };

    const decision = await runExecutiveAgent(task, executiveProfile);

    expect(decision).toBeDefined();
    expect(decision.id).toBe("test-uuid-1234");
    expect(decision.executiveName).toBe("Test Executive");
    expect(decision.executiveRole).toBe("CEO");
    expect(decision.task).toBe("Test task");
    expect(decision.options).toEqual(["Option A", "Option B"]);
    expect(decision.selectedOption).toBe("Option A");
  });
});
