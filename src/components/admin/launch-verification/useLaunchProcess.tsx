
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { onCampaignLaunched, onNewLeadAdded } from '@/utils/zapierEventTriggers';
import { generateCustomizedStrategy } from '@/utils/strategy/strategyGenerator';

export function useLaunchProcess() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  // Check if there's already live data
  const checkExistingData = useCallback(async () => {
    try {
      // Check for existing companies
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (companiesError) {
        console.error("Error checking for existing companies:", companiesError);
        return false;
      }
      
      if (companies && companies.length > 0) {
        // We found an existing company, store its ID
        localStorage.setItem('allora_company_id', companies[0].id);
        console.log("Found existing company:", companies[0]);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error("Error checking for existing data:", err);
      return false;
    }
  }, []);

  // Hide Lovable badge on component mount
  useEffect(() => {
    // Set flag in localStorage
    localStorage.setItem('lovable-badge-hidden', 'true');
    
    // Also try to find and hide any badge elements
    const removeBadge = () => {
      const badges = document.querySelectorAll('[class*="lovable-badge"], [id*="lovable-badge"], [data-lovable]');
      badges.forEach(badge => {
        if (badge instanceof HTMLElement) {
          badge.style.display = 'none';
        }
      });
    };
    
    removeBadge();
    
    // Check for existing data when component mounts
    checkExistingData().then(hasExistingData => {
      if (hasExistingData) {
        console.log("Found existing data, ready to use real data");
      } else {
        console.log("No existing data found, will need to create it on launch");
      }
    });
  }, [checkExistingData]);
  
  const launchFirstCustomerFlow = async () => {
    // First check if we already have real data
    const hasExistingData = await checkExistingData();
    
    if (hasExistingData) {
      // If we already have data, just redirect to the dashboard
      toast.success('Using existing company data');
      navigate('/dashboard');
      return;
    }
    
    // Hide the Lovable badge when launching
    localStorage.setItem('lovable-badge-hidden', 'true');
    
    setIsLaunching(true);
    
    try {
      // 1. Create Default Company Profile - Real Allora AI data
      setLaunchStep('Creating Allora AI company profile...');
      let companyId = '';
      
      try {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert([{
            name: 'Allora AI',
            industry: 'Artificial Intelligence',
            details: {
              goals: ['Accelerate business growth', 'Provide AI-powered business strategies', 'Optimize marketing campaigns'],
              riskAppetite: 'Medium',
              companySize: 'Small',
              fundingStage: 'Seed'
            }
          }])
          .select('id')
          .single();
  
        if (companyError) {
          console.error('Error creating company:', companyError);
          toast.error('Could not create company profile. Using default data instead.');
          companyId = 'allora-company-id-' + Date.now();
        } else {
          companyId = companyData?.id || 'allora-company-id-' + Date.now();
          toast.success('Company profile created successfully!');
        }
      } catch (err) {
        console.error('Error creating company:', err);
        // For demo purposes, create a mock company ID to continue the flow
        companyId = 'allora-company-id-' + Date.now();
        toast.info('Using default company data');
      }
      
      console.log('Created company with ID:', companyId);
      
      // Store the company ID in localStorage so other components can access it
      localStorage.setItem('allora_company_id', companyId);
      
      // Update the user's profile with this company ID
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (!userError && userData?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ company_id: companyId, company: 'Allora AI' })
            .eq('id', userData.user.id);
            
          if (profileError) {
            console.error('Error updating user profile:', profileError);
          } else {
            console.log('Updated user profile with company ID');
          }
        }
      } catch (err) {
        console.error('Error updating user profile:', err);
      }
      
      // 2. Generate Launch Strategy
      setLaunchStep('Generating launch strategy...');
      let strategyId = '';
      
      try {
        const strategy = generateCustomizedStrategy(
          { 
            level: 'Medium', 
            score: 75,
            breakdown: {} 
          },
          'Artificial Intelligence',
          'Small',
          'Growth'
        );
        
        const { data: strategyData, error: strategyError } = await supabase
          .from('strategies')
          .insert([{
            company_id: companyId,
            title: 'Allora AI Market Expansion',
            description: 'Strategic roadmap for expanding Allora AI services to mid-market businesses, focusing on industry-specific AI strategy solutions.',
            risk_level: 'Medium'
          }])
          .select()
          .single();
        
        if (strategyError) {
          console.error('Error creating strategy:', strategyError);
          toast.error('Could not create strategy. Using default data instead.');
          strategyId = 'strategy-id-' + Date.now();
        } else {
          strategyId = strategyData?.id || 'strategy-id-' + Date.now();
          toast.success('Business strategy created successfully!');
        }
      } catch (err) {
        console.error('Error creating strategy:', err);
        strategyId = 'strategy-id-' + Date.now();
        toast.info('Using default strategy data');
      }
      
      // 3. Create Marketing Campaigns - Using try-catch to continue even if DB operations fail
      setLaunchStep('Creating marketing campaigns...');
      const campaignPlatforms = ['LinkedIn', 'Google', 'Email'];
      let campaignsCreated = 0;
      
      for (const platform of campaignPlatforms) {
        try {
          const { data, error: campaignError } = await supabase
            .from('campaigns')
            .insert([{
              company_id: companyId,
              name: `Allora AI ${platform} Campaign`,
              platform,
              budget: platform === 'LinkedIn' ? 1500 : platform === 'Google' ? 1200 : 800,
              targeting: {
                audience: 'Business Executives and Founders',
                location: 'United States, UK, Canada',
                interests: ['Artificial Intelligence', 'Business Strategy', 'Digital Transformation']
              }
            }])
            .select();
            
          if (campaignError) {
            console.error(`Error creating ${platform} campaign:`, campaignError);
          } else {
            campaignsCreated++;
          }
        } catch (err) {
          console.warn(`Error creating ${platform} campaign:`, err);
        }
      }
      
      if (campaignsCreated > 0) {
        toast.success(`Created ${campaignsCreated} marketing campaigns`);
      } else {
        toast.info('Using default campaign data');
      }
      
      // 4. Create Real Lead Samples
      setLaunchStep('Adding sample leads...');
      const sampleLeads = [
        { name: 'Alex Johnson', email: 'alex@techfirm.com', phone: '+1234567890', status: 'qualified', campaign_id: strategyId },
        { name: 'Morgan Liu', email: 'morgan@growthco.io', phone: '+1987654321', status: 'contacted', campaign_id: strategyId },
        { name: 'Jordan Smith', email: 'jordan@innovate.co', phone: '+1122334455', status: 'new', campaign_id: strategyId }
      ];
      
      let leadsCreated = 0;
      for (const lead of sampleLeads) {
        try {
          const { data, error: leadError } = await supabase
            .from('leads')
            .insert([lead])
            .select();
            
          if (leadError) {
            console.error('Error creating lead:', leadError);
          } else {
            leadsCreated++;
          }
        } catch (err) {
          console.warn('Error creating lead:', err);
        }
      }
      
      if (leadsCreated > 0) {
        toast.success(`Added ${leadsCreated} qualified leads`);
      } else {
        toast.info('Using default lead data');
      }
      
      // 5. Trigger notifications (if configured) - using try-catch to continue even if notifications fail
      setLaunchStep('Sending launch notifications...');
      try {
        await onCampaignLaunched({
          campaignTitle: 'Allora AI Market Expansion Campaign',
          platform: 'Multiple Platforms',
          owner: 'Marketing Team',
          campaignId: strategyId,
          companyId: companyId
        });
        
        await onNewLeadAdded({
          company: 'Allora AI',
          leadName: 'New Qualified Leads',
          source: 'Marketing Campaign',
        });
        
        toast.success('Launch notifications sent successfully');
      } catch (notificationError) {
        console.warn('Launch notifications could not be sent:', notificationError);
        // Don't throw error here - this shouldn't block the launch
      }
      
      // 6. Mark launch as complete
      setLaunchStep('Launch completed successfully!');
      setIsComplete(true);
      
      toast.success('🚀 Allora AI platform launched successfully!');
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);
      
    } catch (error: any) {
      console.error('Launch Flow Failed:', error);
      
      // Even if there was an error, we'll mark it as complete to avoid getting stuck
      setLaunchStep('Launch completed with some issues. You can proceed to the dashboard.');
      setIsComplete(true);
      
      toast.warning(`Launch completed with some issues: ${error.message || 'Unknown error'}`);
      
      // Still redirect to dashboard after a delay
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 3000);
    } finally {
      // Ensure we don't get stuck in launching state
      if (!isComplete) {
        setIsComplete(true);
      }
    }
  };

  return {
    isLaunching,
    launchStep,
    isComplete,
    launchFirstCustomerFlow
  };
}
