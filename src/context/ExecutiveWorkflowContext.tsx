
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  CompanyProfile, 
  Strategy, 
  Campaign, 
  Script, 
  DebateStatement,
  generateAllContent,
  saveStrategies,
  saveCampaigns,
  saveExecutiveDebate,
  setupStrategyRefresh
} from '@/services/executiveWorkflowService';
import { toast } from 'sonner';

interface ExecutiveWorkflowContextType {
  isLoading: boolean;
  error: string | null;
  strategies: Strategy[];
  campaigns: Campaign[];
  scripts: Script[];
  debate: DebateStatement[];
  debateSummary: string;
  hasGeneratedContent: boolean;
  generateWorkflow: (companyProfile: CompanyProfile) => Promise<void>;
  refreshStrategies: () => Promise<void>;
}

const ExecutiveWorkflowContext = createContext<ExecutiveWorkflowContextType | undefined>(undefined);

export const ExecutiveWorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [debate, setDebate] = useState<DebateStatement[]>([]);
  const [debateSummary, setDebateSummary] = useState("");
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);

  // Set up the strategy refresh interval when needed
  useEffect(() => {
    if (hasGeneratedContent && companyProfile && profile?.company_id) {
      const cleanupRefresh = setupStrategyRefresh(
        companyProfile,
        profile.company_id,
        (newStrategies) => {
          setStrategies(prev => [...prev, ...newStrategies]);
        },
        10 // Refresh every 10 days
      );
      
      // Cleanup the interval when the component unmounts
      return cleanupRefresh;
    }
  }, [hasGeneratedContent, companyProfile, profile?.company_id]);

  const generateWorkflow = async (profileData: CompanyProfile) => {
    if (!profile?.company_id) {
      toast.error('Company profile not found');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Store the profile for later use
      setCompanyProfile(profileData);
      
      // Generate all content
      const result = await generateAllContent(profileData);
      
      // Update state with the generated content
      setStrategies(result.strategies);
      setCampaigns(result.campaigns);
      setScripts(result.scripts);
      setDebate(result.debate);
      setDebateSummary(result.debateSummary);
      
      // Save everything to the database
      await Promise.all([
        saveStrategies(result.strategies, profile.company_id),
        saveCampaigns(result.campaigns, profile.company_id),
        saveExecutiveDebate(result.debate, result.debateSummary, profile.company_id)
      ]);
      
      setHasGeneratedContent(true);
      toast.success('AI executive workflow generated successfully');
    } catch (err) {
      console.error('Error generating AI executive workflow:', err);
      setError('Failed to generate AI executive workflow');
      toast.error('Failed to generate AI executive workflow');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStrategies = async () => {
    if (!companyProfile || !profile?.company_id) {
      toast.error('Company profile not found');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate new strategies
      const result = await generateAllContent(companyProfile);
      
      // Update state with the new strategies
      setStrategies(result.strategies);
      
      // Save the new strategies to the database
      await saveStrategies(result.strategies, profile.company_id);
      
      toast.success('Strategies refreshed successfully');
    } catch (err) {
      console.error('Error refreshing strategies:', err);
      setError('Failed to refresh strategies');
      toast.error('Failed to refresh strategies');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExecutiveWorkflowContext.Provider
      value={{
        isLoading,
        error,
        strategies,
        campaigns,
        scripts,
        debate,
        debateSummary,
        hasGeneratedContent,
        generateWorkflow,
        refreshStrategies
      }}
    >
      {children}
    </ExecutiveWorkflowContext.Provider>
  );
};

export const useExecutiveWorkflow = () => {
  const context = useContext(ExecutiveWorkflowContext);
  if (context === undefined) {
    throw new Error('useExecutiveWorkflow must be used within an ExecutiveWorkflowProvider');
  }
  return context;
};
