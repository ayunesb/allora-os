import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function completeOnboarding(userId: string, companyId: string, industry: string) {
  try {
    console.log('Starting onboarding completion process');
    
    // 1. Send welcome email
    sendWelcomeEmail(userId);
    
    // 2. Generate strategies and other OpenAI content
    generateAIContent(userId, companyId, industry);
    
    // 3. For eCommerce companies, suggest Shopify integration
    if (industry.toLowerCase().includes('ecommerce') || 
        industry.toLowerCase().includes('e-commerce') || 
        industry.toLowerCase().includes('retail')) {
      showShopifyIntegrationPrompt();
    }
    
    // 4. Assign WhatsApp number and launch campaign (if available)
    assignWhatsAppNumberAndLaunchCampaign(userId, companyId);
    
    // 5. Schedule strategy review Zoom meeting (48 hours from now)
    scheduleStrategyReviewMeeting(companyId);
    
    // 6. Update user status to "onboarded"
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ onboarding_completed_at: new Date().toISOString() })
      .eq('id', userId);
      
    if (updateError) {
      console.error('Error updating onboarding status:', updateError);
      throw new Error('Failed to update onboarding status');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error completing onboarding:', error);
    toast.error('There was a problem completing your onboarding process');
    return { success: false, error: error.message };
  }
}

async function sendWelcomeEmail(userId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('welcome-email', {
      body: { userId }
    });
    
    if (error) throw error;
    
    console.log('Welcome email sent successfully', data);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't stop the onboarding process if email fails
  }
}

async function generateAIContent(userId: string, companyId: string, industry: string) {
  try {
    // Get company profile for more context
    const { data: company } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();
      
    const riskAppetite = company?.details?.riskAppetite || 'medium';
    
    // Generate strategies, campaigns, and debate
    const { data, error } = await supabase.functions.invoke('generate-ai-content', {
      body: { 
        userId,
        companyId,
        industry,
        riskAppetite,
        companyName: company?.name || '',
        companyDetails: company?.details || {}
      }
    });
    
    if (error) throw error;
    
    console.log('AI content generated successfully', data);
  } catch (error) {
    console.error('Failed to generate AI content:', error);
    // Don't stop the onboarding process if generation fails
  }
}

function showShopifyIntegrationPrompt() {
  toast.message(
    'Shopify Integration Available',
    {
      description: 'We noticed you\'re in eCommerce. Connect your Shopify store for enhanced features.',
      action: {
        label: 'Connect',
        onClick: () => window.location.href = '/dashboard/integrations/shopify'
      },
      duration: 10000
    }
  );
}

async function assignWhatsAppNumberAndLaunchCampaign(userId: string, companyId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { 
        action: 'provision-whatsapp',
        userId,
        companyId
      }
    });
    
    if (error) throw error;
    
    console.log('WhatsApp number assigned successfully', data);
    
    if (data.phoneNumber) {
      toast.success(`Your WhatsApp business number is ready: ${data.phoneNumber}`);
    }
  } catch (error) {
    console.error('Failed to assign WhatsApp number:', error);
    // Don't stop the onboarding process if WhatsApp assignment fails
  }
}

async function scheduleStrategyReviewMeeting(companyId: string) {
  try {
    // Get company information
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('name')
      .eq('id', companyId)
      .single();
      
    if (companyError || !company) {
      console.error('Error fetching company data:', companyError);
      return;
    }
    
    // Check if company has Zoom integration
    const { data: zoomIntegration } = await supabase
      .from('company_zoom_integrations')
      .select('*')
      .eq('company_id', companyId)
      .eq('is_connected', true)
      .single();
    
    if (!zoomIntegration) {
      console.log('Company does not have Zoom integration, skipping meeting creation');
      return;
    }
    
    // Calculate meeting time (48 hours from now)
    const meetingDate = new Date();
    meetingDate.setHours(meetingDate.getHours() + 48);
    
    // Round to nearest half hour
    const minutes = meetingDate.getMinutes();
    meetingDate.setMinutes(minutes < 30 ? 30 : 0);
    if (minutes >= 30) {
      meetingDate.setHours(meetingDate.getHours() + 1);
    }
    
    // Create meeting via edge function
    const response = await supabase.functions.invoke('zoom', {
      body: {
        action: 'create-meeting',
        companyId,
        topic: `${company.name} - Strategy Review Call`,
        startTime: meetingDate.toISOString(),
        duration: 60,
        agenda: "Review your Allora AI Executive Strategy and Campaign Plans.",
      }
    });
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    console.log('Strategy review Zoom meeting scheduled successfully');
  } catch (error) {
    console.error('Failed to schedule strategy review meeting:', error);
    // Don't stop onboarding process if meeting creation fails
  }
}
