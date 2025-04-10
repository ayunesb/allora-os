
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
    
    // 5. Update user status to "onboarded"
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
