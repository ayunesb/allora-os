
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { PartialCompanyDetails } from '@/models/companyDetails';

/**
 * Updates or creates a company record with detailed information
 */
export async function updateCompanyDetails(
  userId: string,
  companyDetails: {
    name: string;
    industry: string;
    description: string;
    mission: string;
    vision: string;
    headquarters: string;
    phone: string;
    website?: string;
    email?: string;
    stage?: string;
    businessModel?: {
      freemium?: string;
      premium?: string;
      enterprise?: string;
      upsells?: string[];
    };
    marketInfo?: {
      size?: string;
      growthRate?: string;
      targetCustomers?: string[];
    };
    products?: {
      name: string;
      description: string;
    }[];
    team?: {
      role: string;
      name: string;
    }[];
    financials?: {
      fundingRound?: string;
      fundingAmount?: string;
      valuation?: string;
      useOfFunds?: string;
      cac?: string;
      ltv?: string;
      runway?: string;
    };
    techStack?: string[];
    legalEntity?: {
      name: string;
      country: string;
    };
    additionalDetails?: PartialCompanyDetails;
  }
): Promise<{ success: boolean; companyId?: string; error?: string }> {
  try {
    // First, check if the user already has a company
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id, company')
      .eq('id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }
    
    let companyId = profile?.company_id;
    const extraDetails = {
      description: companyDetails.description,
      mission: companyDetails.mission,
      vision: companyDetails.vision,
      headquarters: companyDetails.headquarters,
      phone: companyDetails.phone,
      website: companyDetails.website,
      email: companyDetails.email,
      businessModel: companyDetails.businessModel,
      marketInfo: companyDetails.marketInfo,
      products: companyDetails.products,
      team: companyDetails.team,
      financials: companyDetails.financials,
      techStack: companyDetails.techStack,
      legalEntity: companyDetails.legalEntity,
      stage: companyDetails.stage,
      ...companyDetails.additionalDetails
    };
    
    // If user has a company, update it
    if (companyId) {
      const { error: updateError } = await supabase
        .from('companies')
        .update({ 
          name: companyDetails.name, 
          industry: companyDetails.industry,
          details: extraDetails
        })
        .eq('id', companyId);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update the profile with company name and industry
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({
          company: companyDetails.name,
          industry: companyDetails.industry
        })
        .eq('id', userId);
        
      if (profileUpdateError) {
        throw profileUpdateError;
      }
      
      return { success: true, companyId };
    }
    
    // Create new company if user doesn't have one
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert([
        { 
          name: companyDetails.name, 
          industry: companyDetails.industry,
          details: extraDetails
        }
      ])
      .select('id')
      .single();

    if (companyError) {
      throw companyError;
    }

    companyId = companyData.id;
    
    // Update the user profile with company_id and set as admin
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        company: companyDetails.name,
        industry: companyDetails.industry,
        company_id: companyId,
        role: 'admin'
      })
      .eq('id', userId);
      
    if (profileUpdateError) {
      throw profileUpdateError;
    }

    return { success: true, companyId };
  } catch (error: any) {
    console.error(`Failed to update company details:`, error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred updating company details"
    };
  }
}

/**
 * Sets up a test company for a specific user
 */
export async function setupTestCompany(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // First get the user ID from the email
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', (await supabase.auth.admin.getUserByEmail(email)).data.user?.id)
      .single();
      
    if (userError) {
      console.error("Error finding user:", userError);
      return { success: false, error: `User with email ${email} not found` };
    }
    
    const userId = userData.id;
    if (!userId) {
      return { success: false, error: "User ID not found" };
    }
    
    // Set up the test company details
    const result = await updateCompanyDetails(userId, {
      name: "Allora AI S.A.S",
      industry: "AI SaaS",
      description: "Allora AI is a SaaS platform that democratizes access to strategic business consulting by using AI personas modeled after global leaders like Elon Musk, Jeff Bezos, and Satya Nadella. Businesses can launch, grow, and dominate their industries with AI-generated strategies, bot debates, and actionable final reports.",
      mission: "Revolutionize business strategy through AI executive intelligence and automation.",
      vision: "Empower businesses worldwide to scale with AI-driven strategic leadership.",
      headquarters: "Calle 40, Colonia El Pedregal, Playa del Carmen, Quintana Roo, México, 77712",
      phone: "+52 984 113 5107",
      website: "www.allora-ai.com",
      email: "contact@allora-ai.com",
      stage: "MVP Completed, Ready for Launch",
      businessModel: {
        freemium: "Free (Limited Access)",
        premium: "$99/month",
        enterprise: "$299/month",
        upsells: ["Custom AI Bot Training", "Premium Reports"]
      },
      marketInfo: {
        size: "$200B+ Global AI SaaS Market",
        growthRate: "30% Year-over-Year",
        targetCustomers: ["Small-Medium Businesses (SMBs)", "Startups", "Entrepreneurs", "Agencies"]
      },
      products: [
        { name: "AI Strategy Wizard", description: "Guided strategy creation tailored to business goals." },
        { name: "Executive Bots Debates", description: "AI executive bots simulate real-time debates to refine strategies." },
        { name: "Final Strategy Report", description: "Auto-generated executive summary and action plan." },
        { name: "Admin Dashboard", description: "KPIs, Growth Metrics, User Management, Analytics." }
      ],
      team: [
        { role: "Founder", name: "Ayunes B." },
        { role: "CTO (Future Hire)", name: "TBD" },
        { role: "Marketing (Future Hire)", name: "TBD" },
        { role: "Customer Success (Future Hire)", name: "TBD" }
      ],
      financials: {
        fundingRound: "Seed",
        fundingAmount: "$400,000",
        valuation: "$2.5 Million (Post-Money)",
        useOfFunds: "50% Product Dev, 30% Marketing, 20% Operations",
        cac: "$20",
        ltv: "$300",
        runway: "12 months"
      },
      techStack: ["React", "Next.js", "Supabase", "Node.js", "OpenAI", "Heygen", "Stripe", "Twilio", "Postmark", "Zapier"],
      legalEntity: {
        name: "Allora AI S.A.S",
        country: "México"
      }
    });
    
    return result;
  } catch (error: any) {
    console.error("Error setting up test company:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Script to set up a test company for existing user
 */
export async function runTestCompanySetup(email: string = "ayunesb@icloud.com"): Promise<void> {
  const result = await setupTestCompany(email);
  
  if (result.success) {
    toast.success(`Test company set up successfully for ${email}`);
    console.log("Test company setup completed successfully");
  } else {
    toast.error(`Failed to set up test company: ${result.error}`);
    console.error("Test company setup failed:", result.error);
  }
}
