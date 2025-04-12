
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, AlertTriangle, Server, Users, Brain, 
  LayoutDashboard, MessageSquare, CreditCard, ShieldCheck, 
  Webhook, Scale, Smartphone, RefreshCw, Download, Save
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  ChecklistItem, 
  ChecklistCategory, 
  EnhancedVerificationState 
} from './types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Define categories with icons and labels
const categories: Record<ChecklistCategory, { icon: React.ReactNode, label: string }> = {
  platform_stability: { icon: <Server className="h-4 w-4" />, label: 'Platform Stability' },
  user_onboarding: { icon: <Users className="h-4 w-4" />, label: 'User Onboarding' },
  ai_bot_logic: { icon: <Brain className="h-4 w-4" />, label: 'AI Bot Logic' },
  dashboard_modules: { icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard Modules' },
  communication_tools: { icon: <MessageSquare className="h-4 w-4" />, label: 'Communication Tools' },
  payment_system: { icon: <CreditCard className="h-4 w-4" />, label: 'Payment System' },
  admin_controls: { icon: <ShieldCheck className="h-4 w-4" />, label: 'Admin Controls' },
  api_integrations: { icon: <Webhook className="h-4 w-4" />, label: 'API Integrations' },
  legal_compliance: { icon: <Scale className="h-4 w-4" />, label: 'Legal & Compliance' },
  cross_device_testing: { icon: <Smartphone className="h-4 w-4" />, label: 'Cross-Device Testing' }
};

// Initial checklist data
const initialChecklist: ChecklistItem[] = [
  // Platform Stability
  { id: 'frontend_build', label: 'Verify frontend builds properly', checked: false, category: 'platform_stability', severity: 'critical', 
    description: 'Check that the application builds without errors on Vercel or other hosting platforms' },
  { id: 'backend_connection', label: 'Verify backend is connected and healthy', checked: false, category: 'platform_stability', severity: 'critical',
    description: 'Confirm Supabase is connected, healthy, and shows no critical lints' },
  { id: 'api_integrations', label: 'Check API integrations', checked: false, category: 'platform_stability', severity: 'high',
    description: 'Verify Twilio, Stripe, Zoom, Heygen, Postmark, Zapier are connected with test data flows' },
  { id: 'e2e_testing', label: 'Conduct manual End-to-End Testing', checked: false, category: 'platform_stability', severity: 'high',
    description: 'Test full flow: Signup → Onboarding → Dashboard → Strategy → Campaigns → Calls → Leads → Payments' },
  { id: 'database_security', label: 'Confirm database security', checked: false, category: 'platform_stability', severity: 'critical',
    description: 'Verify Supabase tables and permissions are secured with Row Level Security activated' },
  { id: 'error_handling', label: 'Verify error handling', checked: false, category: 'platform_stability', severity: 'medium',
    description: 'Ensure the application displays appropriate user feedback for various error scenarios' },
  
  // User Onboarding
  { id: 'onboarding_flow', label: 'Complete signup and onboarding flow', checked: false, category: 'user_onboarding', severity: 'critical',
    description: 'Verify the complete signup and onboarding process works without errors' },
  { id: 'company_creation', label: 'Verify company creation', checked: false, category: 'user_onboarding', severity: 'high',
    description: 'Confirm company details are correctly saved in the database' },
  { id: 'required_fields', label: 'Test required fields', checked: false, category: 'user_onboarding', severity: 'medium',
    description: 'Validate Company Name, Industry, Goals, Risk Appetite fields work as expected' },
  { id: 'auto_triggers', label: 'Ensure automated triggers', checked: false, category: 'user_onboarding', severity: 'high',
    description: 'Verify onboarding triggers AI Strategy Creation, Campaigns, Call Scripts, and AI Bot Debate automatically' },
  { id: 'preference_saving', label: 'Ensure preference saving', checked: false, category: 'user_onboarding', severity: 'medium',
    description: 'Confirm onboarding saves preferences like language, company logo, primary contact' },
  
  // AI Bot Logic
  { id: 'ai_personas', label: 'Check AI personas', checked: false, category: 'ai_bot_logic', severity: 'high',
    description: 'Verify all AI personas (CEO, CMO, CFO, CIO, CHRO, Lead AI, Sales AI, Strategy AI) generate suggestions' },
  { id: 'debates', label: 'Verify AI executive debates', checked: false, category: 'ai_bot_logic', severity: 'medium',
    description: 'Ensure AI executive debates are being written and shown properly' },
  { id: 'risk_strategies', label: 'Test risk-level strategies', checked: false, category: 'ai_bot_logic', severity: 'high',
    description: 'Verify Low, Medium, High risk strategies are triggered based on risk profile' },
  { id: 'fallback_scenarios', label: 'Test fallback scenarios', checked: false, category: 'ai_bot_logic', severity: 'medium',
    description: 'Verify system behavior when OpenAI/GPT is slow or fails' },
  { id: 'persona_explanations', label: 'Verify persona explanations', checked: false, category: 'ai_bot_logic', severity: 'low',
    description: 'Confirm explanations are linked to the correct persona' },
  
  // Dashboard Modules
  { id: 'ceo_message', label: 'CEO Welcome Message', checked: false, category: 'dashboard_modules', severity: 'medium',
    description: 'Verify CEO Welcome Message is auto-generated and visible on Dashboard' },
  { id: 'ai_recommendations', label: 'AI Recommendations', checked: false, category: 'dashboard_modules', severity: 'high',
    description: 'Confirm AI Recommendations populate immediately' },
  { id: 'strategies_list', label: 'Strategies list', checked: false, category: 'dashboard_modules', severity: 'high',
    description: 'Verify Strategies list loads properly with filtering by status/risk' },
  { id: 'campaigns_page', label: 'Campaigns page', checked: false, category: 'dashboard_modules', severity: 'high',
    description: 'Check that Campaigns page shows proposed campaigns without manual entry' },
  { id: 'calls_scripts', label: 'Calls & Scripts page', checked: false, category: 'dashboard_modules', severity: 'medium',
    description: 'Verify Calls & Scripts page shows generated templates' },
  { id: 'leads_page', label: 'Leads page', checked: false, category: 'dashboard_modules', severity: 'high',
    description: 'Confirm Leads page can capture, list, and update lead status' },
  { id: 'profile_settings', label: 'Profile settings', checked: false, category: 'dashboard_modules', severity: 'medium',
    description: 'Test profile settings allow updates to avatar, company info, preferences' },
  
  // Communication Tools
  { id: 'whatsapp', label: 'Test WhatsApp messaging', checked: false, category: 'communication_tools', severity: 'high',
    description: 'Verify WhatsApp message sending via Twilio integration' },
  { id: 'cold_call', label: 'Test Cold Call functionality', checked: false, category: 'communication_tools', severity: 'high',
    description: 'Verify outbound calling via Twilio API' },
  { id: 'zoom_scheduling', label: 'Test Zoom scheduling', checked: false, category: 'communication_tools', severity: 'medium',
    description: 'Confirm Zoom link scheduling through Zoom API' },
  { id: 'email_validation', label: 'Validate email sending', checked: false, category: 'communication_tools', severity: 'high',
    description: 'Test Postmark emails (Welcome Email, Lead Follow-up Email)' },
  { id: 'timeline_log', label: 'Check communication timeline', checked: false, category: 'communication_tools', severity: 'medium',
    description: 'Verify all communications are tracked in the Timeline Log' },
  
  // Payment System
  { id: 'subscription_plans', label: 'Test subscription plans', checked: false, category: 'payment_system', severity: 'critical',
    description: 'Verify Stripe subscription plans (Basic / Pro / Enterprise) are working' },
  { id: 'checkout_flow', label: 'Verify checkout flow', checked: false, category: 'payment_system', severity: 'critical',
    description: 'Test customer checkout → success page → billing portal redirection' },
  { id: 'webhooks', label: 'Check Stripe webhooks', checked: false, category: 'payment_system', severity: 'high',
    description: 'Verify Stripe sends event notifications (subscription created, canceled, upgraded)' },
  { id: 'payment_emails', label: 'Test payment emails', checked: false, category: 'payment_system', severity: 'medium',
    description: 'Confirm email confirmation after payment is sent' },
  { id: 'failed_payments', label: 'Test failed payment handling', checked: false, category: 'payment_system', severity: 'high',
    description: 'Verify grace periods, retries, downgrade scenarios work correctly' },
  
  // Admin Controls
  { id: 'user_management', label: 'Test user management', checked: false, category: 'admin_controls', severity: 'high',
    description: 'Verify admin can view and manage users' },
  { id: 'campaign_monitoring', label: 'Test campaign monitoring', checked: false, category: 'admin_controls', severity: 'medium',
    description: 'Confirm admin can monitor campaigns, leads, strategies' },
  { id: 'api_key_settings', label: 'Verify API key settings', checked: false, category: 'admin_controls', severity: 'high',
    description: 'Test admin settings can update API keys' },
  { id: 'kpi_dashboard', label: 'Check KPI dashboard', checked: false, category: 'admin_controls', severity: 'medium',
    description: 'Verify admin dashboard KPIs load correctly (Users, Revenue, Churn, etc.)' },
  { id: 'reports_automation', label: 'Test reports & automation', checked: false, category: 'admin_controls', severity: 'low',
    description: 'Confirm admin can download reports or trigger Zapier automations' },
  
  // API Integrations
  { id: 'twilio_integration', label: 'Verify Twilio integration', checked: false, category: 'api_integrations', severity: 'high',
    description: 'Test outbound calls, SMS, and WhatsApp functionality' },
  { id: 'stripe_integration', label: 'Verify Stripe integration', checked: false, category: 'api_integrations', severity: 'critical',
    description: 'Confirm payment acceptance and webhook reception' },
  { id: 'postmark_integration', label: 'Verify Postmark integration', checked: false, category: 'api_integrations', severity: 'high',
    description: 'Test email delivery' },
  { id: 'heygen_integration', label: 'Verify Heygen integration', checked: false, category: 'api_integrations', severity: 'medium',
    description: 'Confirm video generation endpoint responding' },
  { id: 'shopify_integration', label: 'Verify Shopify integration', checked: false, category: 'api_integrations', severity: 'low',
    description: 'Test API readiness for e-commerce flows if enabled' },
  { id: 'zapier_integration', label: 'Verify Zapier integration', checked: false, category: 'api_integrations', severity: 'medium',
    description: 'Test automation triggers (New lead → HubSpot CRM, New strategy → Slack notification)' },
  
  // Legal & Compliance
  { id: 'terms_of_service', label: 'Verify Terms of Service', checked: false, category: 'legal_compliance', severity: 'critical',
    description: 'Confirm /legal → Terms of Service page is live and linked from footer' },
  { id: 'privacy_policy', label: 'Verify Privacy Policy', checked: false, category: 'legal_compliance', severity: 'critical',
    description: 'Confirm /privacy → Privacy Policy page is live and linked from footer' },
  { id: 'cookies_policy', label: 'Verify Cookies Policy', checked: false, category: 'legal_compliance', severity: 'high',
    description: 'Check /cookies → Cookie Policy + Consent popup showing for EU users' },
  { id: 'gdpr_compliance', label: 'Verify GDPR Compliance', checked: false, category: 'legal_compliance', severity: 'high',
    description: 'Confirm Data Access / Deletion rights are available' },
  { id: 'soc2_checklist', label: 'Check SOC2 compliance', checked: false, category: 'legal_compliance', severity: 'medium',
    description: 'Verify SOC2 Starter Kit checklist has been followed' },
  { id: 'support_email', label: 'Test support email', checked: false, category: 'legal_compliance', severity: 'medium',
    description: 'Confirm support@all-or-a.com email is working' },
  { id: 'cancellation_policy', label: 'Verify cancellation policy', checked: false, category: 'legal_compliance', severity: 'high',
    description: 'Check cancellation and refund policies are posted' },
  
  // Cross-Device Testing
  { id: 'responsive_design', label: 'Verify responsive design', checked: false, category: 'cross_device_testing', severity: 'critical',
    description: 'Test site responsiveness across iPhone, Android, iPad, Tablets, and Desktop' },
  { id: 'feature_consistency', label: 'Check feature consistency', checked: false, category: 'cross_device_testing', severity: 'high',
    description: 'Verify all features work without breaking (Dashboard, Calls, AI chat, Admin)' },
  { id: 'mobile_usability', label: 'Test mobile usability', checked: false, category: 'cross_device_testing', severity: 'high',
    description: 'Confirm mobile strategy cards, lead forms, and navigation are usable' }
];

// Calculate initial progress
const calculateProgress = (items: ChecklistItem[]): EnhancedVerificationState['progress'] => {
  const progress: any = {};
  
  Object.keys(categories).forEach(category => {
    const categoryItems = items.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.checked).length;
    
    progress[category] = {
      total: categoryItems.length,
      completed,
      percentage: categoryItems.length > 0 ? Math.round((completed / categoryItems.length) * 100) : 0
    };
  });
  
  return progress;
};

const calculateOverallProgress = (progress: EnhancedVerificationState['progress']): EnhancedVerificationState['overallProgress'] => {
  let total = 0;
  let completed = 0;
  
  Object.values(progress).forEach(categoryProgress => {
    total += categoryProgress.total;
    completed += categoryProgress.completed;
  });
  
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

// Calculate severity counts
const getSeverityCounts = (items: ChecklistItem[]) => {
  return {
    critical: items.filter(item => item.severity === 'critical').length,
    high: items.filter(item => item.severity === 'high').length,
    medium: items.filter(item => item.severity === 'medium').length,
    low: items.filter(item => item.severity === 'low').length
  };
};

export function EnhancedVerificationChecklist() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<ChecklistCategory>('platform_stability');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Calculate progress
  const progress = calculateProgress(checklist);
  const overallProgress = calculateOverallProgress(progress);

  // Get severity counts
  const severityCounts = getSeverityCounts(checklist);
  
  // Handle checkbox change
  const handleCheckItem = (id: string, checked: boolean) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked } : item
      )
    );
  };
  
  // Load saved checklist from Supabase
  const loadChecklist = async () => {
    if (!profile?.company_id) {
      toast.error("Unable to load checklist", { description: "No company ID found" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('launch_verification_checklists')
        .select('checklist_data')
        .eq('company_id', profile.company_id)
        .single();
        
      if (error) {
        console.error("Error loading checklist:", error);
        return;
      }
      
      if (data?.checklist_data) {
        const savedItems = data.checklist_data as ChecklistItem[];
        
        // Merge saved item state with current checklist structure
        // This ensures new items added to the checklist still appear
        setChecklist(initialChecklist.map(item => {
          const savedItem = savedItems.find(saved => saved.id === item.id);
          return savedItem ? { ...item, checked: savedItem.checked } : item;
        }));
        
        toast.success("Checklist loaded successfully");
      }
    } catch (error) {
      console.error("Error loading checklist:", error);
      toast.error("Failed to load checklist");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Save checklist to Supabase
  const saveChecklist = async () => {
    if (!profile?.company_id) {
      toast.error("Unable to save checklist", { description: "No company ID found" });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('launch_verification_checklists')
        .upsert({
          company_id: profile.company_id,
          checklist_data: checklist,
          last_updated: new Date().toISOString()
        }, { onConflict: 'company_id' });
        
      if (error) throw error;
      
      toast.success("Checklist saved successfully");
    } catch (error) {
      console.error("Error saving checklist:", error);
      toast.error("Failed to save checklist");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Export checklist as JSON
  const exportChecklist = () => {
    const dataStr = JSON.stringify({
      items: checklist,
      progress,
      overallProgress,
      exportDate: new Date().toISOString(),
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `launch-verification-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="border-border/40 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Enhanced Launch Verification Checklist
          <Badge className={overallProgress.percentage === 100 ? 'bg-green-500' : ''}>
            {overallProgress.completed}/{overallProgress.total} ({overallProgress.percentage}%)
          </Badge>
        </CardTitle>
        <CardDescription>
          Comprehensive verification system for Allora AI platform readiness
        </CardDescription>
        
        <div className="mt-4">
          <Progress value={overallProgress.percentage} className="h-2" />
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="border-red-500 text-red-500">
              Critical: {severityCounts.critical}
            </Badge>
            <Badge variant="outline" className="border-orange-500 text-orange-500">
              High: {severityCounts.high}
            </Badge>
            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
              Medium: {severityCounts.medium}
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Low: {severityCounts.low}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="platform_stability" value={activeTab} onValueChange={(v) => setActiveTab(v as ChecklistCategory)}>
        <div className="px-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            {Object.entries(categories).map(([key, { icon, label }]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="flex items-center gap-1"
              >
                {icon}
                <span className="hidden md:inline-block">{label}</span>
                <span className="md:hidden">{label.split(' ')[0]}</span>
                {progress[key as ChecklistCategory].completed === progress[key as ChecklistCategory].total && 
                  progress[key as ChecklistCategory].total > 0 && (
                  <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <CardContent>
          {Object.entries(categories).map(([key, { label }]) => (
            <TabsContent key={key} value={key} className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{label}</h3>
                <Badge variant="outline">
                  {progress[key as ChecklistCategory].completed}/{progress[key as ChecklistCategory].total}
                </Badge>
              </div>
              
              <Progress 
                value={progress[key as ChecklistCategory].percentage} 
                className="h-2 mb-6" 
              />
              
              <div className="space-y-4">
                {checklist
                  .filter(item => item.category === key)
                  .map(item => (
                    <div 
                      key={item.id} 
                      className={`flex items-start p-3 rounded-md border ${
                        item.checked ? 'bg-muted/50 border-muted' : 
                        item.severity === 'critical' ? 'border-red-200 bg-red-50' :
                        item.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                        item.severity === 'medium' ? 'border-yellow-100 bg-yellow-50' :
                        'border-blue-100 bg-blue-50'
                      }`}
                    >
                      <Checkbox 
                        id={item.id} 
                        checked={item.checked}
                        onCheckedChange={(checked) => handleCheckItem(item.id, checked as boolean)} 
                        className="mt-1"
                      />
                      <div className="ml-3 space-y-1">
                        <label 
                          htmlFor={item.id} 
                          className="font-medium cursor-pointer"
                        >
                          {item.label}
                          {item.severity === 'critical' && (
                            <Badge variant="destructive" className="ml-2 text-[10px] py-0">CRITICAL</Badge>
                          )}
                          {item.severity === 'high' && (
                            <Badge className="ml-2 text-[10px] py-0 bg-orange-500">HIGH</Badge>
                          )}
                        </label>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadChecklist} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Load Saved
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportChecklist}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        
        <Button onClick={saveChecklist} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
