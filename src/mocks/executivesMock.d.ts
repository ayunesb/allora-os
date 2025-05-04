import { ExecutiveMessage } from '@/types/agents';
/**
 * Mock data for executives table
 */
export declare const mockExecutives: {
    id: string;
    name: string;
    role: string;
    expertise: string[];
    level: string;
    star_rating: number;
    successful_actions: number;
    failed_actions: number;
    resource_points: number;
}[];
/**
 * Mock implementation for executive messaging
 */
export declare const mockMessages: ExecutiveMessage[];
export declare const mockExecutivesTable: {
    select: jest.Mock<any, any, any>;
    update: jest.Mock<any, any, any>;
    insert: jest.Mock<any, any, any>;
};
export declare const mockAgentLogsTable: {
    insert: jest.Mock<any, any, any>;
    select: jest.Mock<any, any, any>;
};
