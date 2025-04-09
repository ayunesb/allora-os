
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { updateCompanyDetails } from './companyUpdate';

/**
 * Sets up a test company for a specific user
 */
export async function setupTestCompany(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    let userId: string;
    
    // First try the direct query approach with explicit casting to avoid type recursion
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1)
      .single();
      
    if (error) {
      console.error("Error finding user:", error);
      return { success: false, error: `User with email ${email} not found` };
    }
    
    userId = data.id;
    
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
