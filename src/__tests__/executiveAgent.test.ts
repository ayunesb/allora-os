
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runExecutiveAgent } from '../agents/executiveAgent';
import { executiveProfiles } from '../agents/agentProfiles';
import { supabase } from '@/integrations/supabase/client';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => {
  return {
    supabase: {
      functions: {
        invoke: vi.fn()
      },
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null
        })
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockReturnValue({
                data: [],
                error: null
              })
            })
          }),
          ilike: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                data: [],
                error: null
              })
            })
          }),
          insert: vi.fn().mockReturnValue({
            data: null,
            error: null
          })
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              data: null,
              error: null
            })
          })
        })
      }
    }
  };
});

describe('Executive Agent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock for supabase functions invoke
    (supabase.functions.invoke as any).mockResolvedValue({
      data: {
        content: JSON.stringify({
          options: ["Option 1", "Option 2"],
          selectedOption: "Option 1",
          reasoning: "This is the reasoning",
          riskAssessment: "This is the risk assessment"
        })
      },
      error: null
    });
  });

  it('should return a decision when given a task', async () => {
    const decision = await runExecutiveAgent(
      "Analyze our Q2 marketing strategy", 
      executiveProfiles.cmo,
      { saveToDatabase: false }
    );

    expect(decision).toBeDefined();
    expect(decision.executiveName).toBe(executiveProfiles.cmo.name);
    expect(decision.executiveRole).toBe(executiveProfiles.cmo.role);
    expect(decision.task).toBe("Analyze our Q2 marketing strategy");
    expect(decision.selectedOption).toBe("Option 1");
  });

  it('should handle errors gracefully', async () => {
    // Mock a failure
    (supabase.functions.invoke as any).mockRejectedValue(new Error("Test error"));

    const decision = await runExecutiveAgent(
      "Analyze our Q2 marketing strategy", 
      executiveProfiles.cmo,
      { saveToDatabase: false }
    );

    expect(decision).toBeDefined();
    expect(decision.executiveName).toBe(executiveProfiles.cmo.name);
    expect(decision.selectedOption).toBe("N/A");
    expect(decision.reasoning).toContain("technical issues");
  });
});
