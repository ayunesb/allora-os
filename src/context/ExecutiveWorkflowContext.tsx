
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

// Create the context with default empty functions
const ExecutiveWorkflowContext = createContext<WorkflowContextType>({
  generateAllContent: async () => {},
  saveGeneratedStrategiesToDB: async () => {},
  saveGeneratedCampaignsToDB: async () => {},
  saveGeneratedScriptsToDB: async () => {},
  saveExecutiveDebateToDB: async () => {},
  updateCompanyWorkflowStatus: async () => {},
  setupStrategyRefresh: async () => {},
  generateWorkflow: async () => {},
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
      // Implementation would go here in a real app
      console.log("Generating workflow for company:", company.name);
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasGeneratedContent(true);
    } catch (error) {
      console.error('Error generating workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateAllContent = async (companyProfile: CompanyProfile) => {
    // Implementation would go here in a real app
    console.log('Generating content for company:', companyProfile.name);
  };
  
  const saveGeneratedStrategiesToDB = async (strategies: Strategy[]) => {
    // Implementation would go here in a real app
    console.log('Saving strategies:', strategies.length);
  };
  
  const saveGeneratedCampaignsToDB = async (campaigns: Campaign[]) => {
    // Implementation would go here in a real app
    console.log('Saving campaigns:', campaigns.length);
  };
  
  const saveGeneratedScriptsToDB = async (scripts: Script[]) => {
    // Implementation would go here in a real app
    console.log('Saving scripts:', scripts.length);
  };
  
  const saveExecutiveDebateToDB = async (statements: DebateStatement[]) => {
    // Implementation would go here in a real app
    console.log('Saving debate statements:', statements.length);
  };
  
  const updateCompanyWorkflowStatus = async (status: string) => {
    // Implementation would go here in a real app
    console.log('Updating workflow status to:', status);
  };
  
  const setupStrategyRefresh = async (scheduleInDays: number) => {
    // Implementation would go here in a real app
    console.log('Setting up strategy refresh for every', scheduleInDays, 'days');
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
