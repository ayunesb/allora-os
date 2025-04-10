
import React, { useState } from 'react';
import { Rocket, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { onCampaignLaunched, onNewLeadAdded } from '@/utils/zapierEventTriggers';
import { generateCustomizedStrategy } from '@/utils/strategy/strategyGenerator';
import { useRouter } from 'react-router-dom';

interface LaunchButtonProps {
  className?: string;
}

export function LaunchButton({ className }: LaunchButtonProps) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const launchFirstCustomerFlow = async () => {
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
        { level: 'Medium', score: 65 },
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
        router.push(`/admin`);
      }, 3000);
      
    } catch (error: any) {
      console.error('Launch Flow Failed:', error);
      toast.error(`Launch Failed: ${error.message || 'Unknown error'}`);
      setIsLaunching(false);
      setLaunchStep(null);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {!isLaunching ? (
        <Button 
          onClick={launchFirstCustomerFlow} 
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-8 text-lg font-medium rounded-xl w-full sm:w-auto transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Rocket className="h-5 w-5" />
          Launch Allora AI
        </Button>
      ) : (
        <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            {isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
            )}
            <span className="font-medium">{launchStep}</span>
          </div>
          
          {isComplete && (
            <p className="text-sm text-muted-foreground">
              Allora AI has been successfully launched as its own first customer. Redirecting to dashboard...
            </p>
          )}
        </div>
      )}

      <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">What happens when you launch?</h3>
        <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1.5">
          <li className="flex items-start gap-1.5">
            <span className="text-indigo-500">•</span>
            <span>Creates Allora AI as its own demo customer</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-indigo-500">•</span>
            <span>Generates strategic launch plans</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-indigo-500">•</span>
            <span>Sets up initial marketing campaigns</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-indigo-500">•</span>
            <span>Pre-loads sample leads for demonstrations</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-indigo-500">•</span>
            <span>Notifies team channels of launch initiation</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
