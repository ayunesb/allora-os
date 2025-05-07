/**
 * Mock data for executives table
 */
export const mockExecutives = [
    {
        id: "exec-1",
        name: "Sarah Chen",
        role: "CEO",
        expertise: ["Strategy", "Leadership", "Vision"],
        level: "Senior",
        star_rating: 5,
        successful_actions: 24,
        failed_actions: 2,
        resource_points: 100,
    },
    {
        id: "exec-2",
        name: "Marcus Johnson",
        role: "CFO",
        expertise: ["Finance", "Risk Management", "Investment"],
        level: "Senior",
        star_rating: 4,
        successful_actions: 18,
        failed_actions: 3,
        resource_points: 85,
    },
    {
        id: "exec-3",
        name: "Elena Rodriguez",
        role: "CTO",
        expertise: ["Technology", "Innovation", "Digital Transformation"],
        level: "Senior",
        star_rating: 5,
        successful_actions: 22,
        failed_actions: 1,
        resource_points: 95,
    },
];
/**
 * Mock implementation for executive messaging
 */
export const mockMessages = [
    {
        id: "msg-1",
        created_at: "2025-04-28T14:30:00Z",
        from_executive: "Sarah Chen",
        to_executive: "Marcus Johnson",
        message_content: "We should discuss the Q3 budget projections before the board meeting.",
        status: "read",
    },
    {
        id: "msg-2",
        created_at: "2025-04-28T15:45:00Z",
        from_executive: "Marcus Johnson",
        to_executive: "Sarah Chen",
        message_content: "I've prepared the financial forecast. Let's review it tomorrow morning.",
        status: "read",
    },
    {
        id: "msg-3",
        created_at: "2025-04-29T09:15:00Z",
        from_executive: "Elena Rodriguez",
        to_executive: "Sarah Chen",
        message_content: "The new product features are ready for demo. Would you like to see them today?",
        status: "unread",
    },
];
// Mock supabase responses for the executives table
export const mockExecutivesTable = {
    select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
            single: jest
                .fn()
                .mockResolvedValue({ data: mockExecutives[0], error: null }),
        }),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue({ data: mockExecutives, error: null }),
    }),
    update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    }),
    insert: jest.fn().mockResolvedValue({ data: null, error: null }),
};
// This mocks the agent_logs table which is a real table used for tracking agent activities
export const mockAgentLogsTable = {
    insert: jest.fn().mockResolvedValue({ data: null, error: null }),
    select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
};
