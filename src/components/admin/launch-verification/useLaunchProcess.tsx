
import { useState, useEffect } from 'react';
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
  }, []);
  
  const launchFirstCustomerFlow = async () => {
    // Hide the Lovable badge when launching
    localStorage.setItem('lovable-badge-hidden', 'true');
    
    setIsLaunching(true);
    
    try {
      // 1. Create Default Company Profile
      setLaunchStep('Creating Allora AI company profile...');
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([{
          name: 'Allora AI Launch',
          industry: 'AI SaaS Launch',
          details: {
            goals: ['Grow awareness', 'Acquire 100 clients', 'Demonstrate full power of Allora AI'],
            riskAppetite: 'Medium',
            companySize: 'Small',
            fundingStage: 'Seed'
          }
        }])
        .select('id')
        .single();

      if (companyError) throw companyError;
      
      const companyId = companyData.id;
      console.log('Created company with ID:', companyId);
      
      // 2. Generate Launch Strategy
      setLaunchStep('Generating launch strategy...');
      const strategy = generateCustomizedStrategy(
        { 
          level: 'Medium', 
          score: 65,
          breakdown: {} // Add the missing breakdown property
        },
        'AI SaaS',
        'Small',
        'Growth'
      );
      
      const { data: strategyData, error: strategyError } = await supabase
        .from('strategies')
        .insert([{
          company_id: companyId,
          title: 'Launch Allora AI',
          description: 'Strategically promote and showcase Allora AI as a first use-case, targeting tech founders and AI enthusiasts.',
          risk_level: 'Medium'
        }])
        .select()
        .single();
      
      if (strategyError) throw strategyError;
      
      // 3. Create First Campaigns
      setLaunchStep('Creating initial marketing campaigns...');
      const campaignPlatforms = ['LinkedIn', 'Google', 'Facebook'];
      const campaignPromises = campaignPlatforms.map(platform => 
        supabase.from('campaigns').insert([{
          company_id: companyId,
          name: `Allora AI Launch - ${platform}`,
          platform,
          budget: platform === 'LinkedIn' ? 500 : platform === 'Google' ? 400 : 300,
          targeting: {
            audience: 'Tech Founders and AI Enthusiasts',
            location: 'United States',
            interests: ['Artificial Intelligence', 'SaaS', 'Business Growth']
          }
        }])
      );
      
      await Promise.all(campaignPromises);
      
      // 4. Create Lead Samples
      setLaunchStep('Preloading sample leads...');
      const sampleLeads = [
        { name: 'John Founder', email: 'john@example.com', phone: '+1234567890' },
        { name: 'Sarah CTO', email: 'sarah@techcompany.com', phone: '+1987654321' },
        { name: 'Michael CEO', email: 'michael@startup.io', phone: '+1122334455' }
      ];
      
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert(sampleLeads.map(lead => ({
          ...lead,
          status: 'new',
          campaign_id: strategyData.id, // Using strategy ID as a placeholder
        })))
        .select();
      
      if (leadError) throw leadError;
      
      // 5. Trigger Zapier notifications
      setLaunchStep('Sending launch notifications...');
      await onCampaignLaunched({
        campaignTitle: 'Allora AI Launch Campaign',
        platform: 'Multiple Platforms',
        owner: 'Admin',
        campaignId: strategyData.id,
        companyId: companyId
      });
      
      await onNewLeadAdded({
        company: companyId,
        leadName: 'Initial Demo Leads',
        source: 'Launch Process',
      });
      
      // 6. Mark launch as complete
      setLaunchStep('Launch completed successfully!');
      setIsComplete(true);
      
      toast.success('🚀 Launch sequence initiated! Allora AI is now its own first customer.');
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate(`/admin`);
      }, 3000);
      
    } catch (error: any) {
      console.error('Launch Flow Failed:', error);
      toast.error(`Launch Failed: ${error.message || 'Unknown error'}`);
      setIsLaunching(false);
      setLaunchStep(null);
    }
  };

  return {
    isLaunching,
    launchStep,
    isComplete,
    launchFirstCustomerFlow
  };
}
