
import React from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Settings, Cpu } from 'lucide-react';
import { PageTitle } from '@/components/ui/page-title';
import AiBehaviorSettings from '@/components/ai/AiBehaviorSettings';
import AiPreferencesForm from '@/components/ai/AiPreferencesForm';
import SettingsSection from '@/components/ui/settings-section';

export default function AISettings() {
  return (
    <div>
      <DashboardBreadcrumb
        rootPath="/dashboard/ai-settings"
        rootLabel="AI Settings"
        rootIcon={<Cpu className="h-4 w-4" />}
      />
      
      <PageTitle>
        AI Settings
        <span className="text-muted-foreground block text-base font-normal">
          Customize how the executive AI team helps your business
        </span>
      </PageTitle>
      
      <div className="space-y-10">
        <SettingsSection 
          title="AI Behavior Preferences"
          description="Configure how the AI executives make decisions and interact with you"
          icon={<Settings className="h-5 w-5" />}
        >
          <AiBehaviorSettings />
        </SettingsSection>
        
        <SettingsSection
          title="AI Strategy Preferences"
          description="Set your preferences for marketing strategy creation"
          icon={<Cpu className="h-5 w-5" />}
        >
          <AiPreferencesForm />
        </SettingsSection>
      </div>
    </div>
  );
}
