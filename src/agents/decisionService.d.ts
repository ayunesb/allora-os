import { ExecutiveDecision } from '@/types/agents';
export declare function getExecutiveDecisions(): Promise<ExecutiveDecision[]>;
export declare function saveDecisionToDatabase(decision: ExecutiveDecision): Promise<string | null>;
