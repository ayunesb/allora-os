import React, { ReactNode } from "react";
export interface CompanyProfile {
  id?: string;
  name?: string;
  industry?: string;
  size?: string | number;
  founded?: string | number;
  location?: string;
  revenue?: string | number;
  employees?: string | number;
  description?: string;
  mission?: string;
  values?: string[];
  website?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  competitors?: string[];
}
export interface Strategy {
  id?: string;
  title: string;
  description: string;
  category?: string;
  riskLevel?: "low" | "medium" | "high";
  timeframe?: string;
  roi?: number | string;
  status?: "draft" | "active" | "completed" | "archived";
  steps?: Array<{
    title: string;
    description?: string;
    completed?: boolean;
  }>;
  metrics?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}
export interface Campaign {
  id?: string;
  name: string;
  description?: string;
  type?: string;
  platform?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  audience?: string[];
  goals?: string[];
  metrics?: Record<string, any>;
  status?: "draft" | "active" | "paused" | "completed";
  content?: Record<string, any>;
}
export interface Script {
  id?: string;
  title: string;
  content: string;
  purpose?: string;
  audience?: string;
  type?: "sales" | "support" | "onboarding" | "feedback" | "other";
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface DebateStatement {
  executive: string;
  statement: string;
  sentiment?: "positive" | "negative" | "neutral";
  confidence?: number;
  timeStamp?: string;
  references?: Array<{
    type: string;
    source: string;
    context?: string;
  }>;
}
interface WorkflowContextType {
  generateAllContent: (companyProfile: CompanyProfile) => Promise<void>;
  saveGeneratedStrategiesToDB: (strategies: Strategy[]) => Promise<void>;
  saveGeneratedCampaignsToDB: (campaigns: Campaign[]) => Promise<void>;
  saveGeneratedScriptsToDB: (scripts: Script[]) => Promise<void>;
  saveExecutiveDebateToDB: (statements: DebateStatement[]) => Promise<void>;
  updateCompanyWorkflowStatus: (status: string) => Promise<void>;
  setupStrategyRefresh: (scheduleInDays: number) => Promise<void>;
  generateWorkflow: (company: CompanyProfile) => Promise<void>;
  isLoading: boolean;
  hasGeneratedContent: boolean;
}
export declare const ExecutiveWorkflowProvider: React.FC<{
  children: ReactNode;
}>;
export declare const useExecutiveWorkflow: () => WorkflowContextType;
export {};
