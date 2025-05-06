export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AgentOptions = any; // Replace `any` with the actual type if known
export type AgentRunOptions = any; // Replace `any` with the actual type if known
export type ExecutiveAgentProfile = any; // Replace `any` with the actual type if known

export {};