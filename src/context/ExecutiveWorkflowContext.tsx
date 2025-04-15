
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define proper interfaces for the types mentioned in the build errors
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
  riskLevel?: 'low' | 'medium' | 'high';
  timeframe?: string;
  roi?: number | string;
  status?: 'draft' | 'active' | 'completed' | 'archived';
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
  status?: 'draft' | 'active' | 'paused' | 'completed';
  content?: Record<string, any>;
}

export interface Script {
  id?: string;
  title: string;
  content: string;
  purpose?: string;
  audience?: string;
  type?: 'sales' | 'support' | 'onboarding' | 'feedback' | 'other';
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DebateStatement {
  executive: string;
  statement: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
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

// Implement placeholder functions
export const generateAllContent = async (companyProfile: CompanyProfile) => {
  console.log('Generating content for company:', companyProfile.name);
};

export const saveGeneratedStrategiesToDB = async (strategies: Strategy[]) => {
  console.log('Saving strategies:', strategies.length);
};

export const saveGeneratedCampaignsToDB = async (campaigns: Campaign[]) => {
  console.log('Saving campaigns:', campaigns.length);
};

export const saveGeneratedScriptsToDB = async (scripts: Script[]) => {
  console.log('Saving scripts:', scripts.length);
};

export const saveExecutiveDebateToDB = async (statements: DebateStatement[]) => {
  console.log('Saving debate statements:', statements.length);
};

export const updateCompanyWorkflowStatus = async (status: string) => {
  console.log('Updating workflow status to:', status);
};

export const setupStrategyRefresh = async (scheduleInDays: number) => {
  console.log('Setting up strategy refresh for every', scheduleInDays, 'days');
};

export const generateWorkflow = async (company: CompanyProfile) => {
  console.log('Generating workflow for company:', company.name);
};

// Create the context with default empty object
export const ExecutiveWorkflowContext = createContext<WorkflowContextType>({
  generateAllContent,
  saveGeneratedStrategiesToDB,
  saveGeneratedCampaignsToDB,
  saveGeneratedScriptsToDB,
  saveExecutiveDebateToDB,
  updateCompanyWorkflowStatus,
  setupStrategyRefresh,
  generateWorkflow,
  isLoading: false,
  hasGeneratedContent: false
});

// Create a provider component
export const ExecutiveWorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
  
  const handleGenerateWorkflow = async (company: CompanyProfile) => {
    setIsLoading(true);
    try {
      await generateWorkflow(company);
      setHasGeneratedContent(true);
    } catch (error) {
      console.error('Error generating workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const value: WorkflowContextType = {
    generateAllContent,
    saveGeneratedStrategiesToDB,
    saveGeneratedCampaignsToDB,
    saveGeneratedScriptsToDB,
    saveExecutiveDebateToDB,
    updateCompanyWorkflowStatus,
    setupStrategyRefresh,
    generateWorkflow: handleGenerateWorkflow,
    isLoading,
    hasGeneratedContent
  };

  return (
    <ExecutiveWorkflowContext.Provider value={value}>
      {children}
    </ExecutiveWorkflowContext.Provider>
  );
};

// Create a hook for using the context
export const useExecutiveWorkflow = () => {
  const context = useContext(ExecutiveWorkflowContext);
  if (!context) {
    throw new Error('useExecutiveWorkflow must be used within an ExecutiveWorkflowProvider');
  }
  return context;
};
