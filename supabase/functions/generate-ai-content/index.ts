
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

// Helper logging function 
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-AI-CONTENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    logStep("Function started");
    
    // Get request body
    const { userId, companyId, industry, riskAppetite, companyName, companyDetails } = await req.json();
    
    if (!userId || !companyId) {
      throw new Error("User ID and Company ID are required");
    }
    
    logStep("Request parameters", { userId, companyId, industry, riskAppetite });
    
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });
    
    // Initialize client with the user's JWT to respect RLS policies
    const authHeader = req.headers.get('Authorization');
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
      global: { headers: { Authorization: authHeader || "" } }
    });
    
    // 1. Generate strategy recommendations
    const strategies = await generateStrategies(industry, riskAppetite, companyName, companyDetails);
    logStep("Strategies generated", { count: strategies.length });
    
    // Save strategies to database
    for (const strategy of strategies) {
      const { error: strategyError } = await supabaseAdmin
        .from('strategies')
        .insert({
          title: strategy.title,
          description: strategy.description,
          company_id: companyId,
          created_by: userId,
          executive_bot: strategy.executive,
          risk_level: strategy.riskLevel,
          implementation_steps: strategy.implementationSteps,
          estimated_cost: strategy.estimatedCost,
          estimated_time: strategy.estimatedTime,
          required_resources: strategy.requiredResources,
          expected_outcome: strategy.expectedOutcome,
          potential_risks: strategy.potentialRisks,
          status: 'pending'
        });
        
      if (strategyError) {
        logStep("Error inserting strategy", strategyError);
      }
    }
    
    // 2. Generate campaign proposals
    const campaigns = await generateCampaigns(industry, companyName, companyDetails);
    logStep("Campaigns generated", { count: campaigns.length });
    
    // Save campaigns to database
    for (const campaign of campaigns) {
      const { error: campaignError } = await supabaseAdmin
        .from('campaigns')
        .insert({
          name: campaign.name,
          description: campaign.description,
          company_id: companyId,
          created_by: userId,
          executive_bot: campaign.executive,
          platform: campaign.platform,
          target_audience: campaign.targetAudience,
          budget: campaign.budget,
          duration: campaign.duration,
          expected_outcome: campaign.expectedOutcome,
          status: 'pending'
        });
        
      if (campaignError) {
        logStep("Error inserting campaign", campaignError);
      }
    }
    
    // 3. Generate AI debate
    const debate = await generateAIDebate(industry, riskAppetite, companyName, companyDetails);
    logStep("AI debate generated");
    
    // Save AI debate to database
    const { error: debateError } = await supabaseAdmin
      .from('ai_debates')
      .insert({
        title: debate.title,
        context: debate.context,
        company_id: companyId,
        created_by: userId,
        participants: debate.participants,
        transcript: debate.transcript,
        conclusion: debate.conclusion,
        recommendation: debate.recommendation
      });
      
    if (debateError) {
      logStep("Error inserting AI debate", debateError);
    }
    
    // 4. Generate sample call scripts
    const scripts = await generateCallScripts(industry, companyName, companyDetails);
    logStep("Call scripts generated", { count: scripts.length });
    
    // Save call scripts to database
    for (const script of scripts) {
      const { error: scriptError } = await supabaseAdmin
        .from('call_scripts')
        .insert({
          title: script.title,
          script_text: script.scriptText,
          company_id: companyId,
          created_by: userId,
          executive_bot: script.executive,
          target_audience: script.targetAudience,
          purpose: script.purpose,
          estimated_duration: script.estimatedDuration,
          key_points: script.keyPoints,
          objection_handling: script.objectionHandling
        });
        
      if (scriptError) {
        logStep("Error inserting call script", scriptError);
      }
    }
    
    // Update user profile to indicate onboarding is complete
    await supabaseAdmin
      .from('profiles')
      .update({ onboarding_completed: true, onboarded_at: new Date().toISOString() })
      .eq('id', userId);
    
    // Record API usage
    await recordApiUsage(supabaseAdmin, companyId, {
      strategyGenerations: strategies.length,
      campaignGenerations: campaigns.length,
      scriptGenerations: scripts.length,
      aiDebateRuns: 1,
      openAiTokensUsed: 2000 // Estimated token usage
    });
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          strategies: strategies.length,
          campaigns: campaigns.length,
          scripts: scripts.length,
          debate: debate.title
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    logStep("Error in function", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Record API usage
async function recordApiUsage(supabase: any, companyId: string, usage: any) {
  try {
    // Get current API usage
    const { data: usageData, error: fetchError } = await supabase
      .from('api_usage')
      .select('*')
      .eq('company_id', companyId)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      logStep("Error fetching API usage", fetchError);
      return;
    }
    
    const newUsage = usageData || {
      company_id: companyId,
      total_api_calls: 0,
      openai_tokens_used: 0,
      strategy_generations: 0,
      campaign_generations: 0,
      script_generations: 0,
      ai_debate_runs: 0
    };
    
    // Update usage
    newUsage.total_api_calls = (newUsage.total_api_calls || 0) + 1;
    newUsage.openai_tokens_used = (newUsage.openai_tokens_used || 0) + (usage.openAiTokensUsed || 0);
    newUsage.strategy_generations = (newUsage.strategy_generations || 0) + (usage.strategyGenerations || 0);
    newUsage.campaign_generations = (newUsage.campaign_generations || 0) + (usage.campaignGenerations || 0);
    newUsage.script_generations = (newUsage.script_generations || 0) + (usage.scriptGenerations || 0);
    newUsage.ai_debate_runs = (newUsage.ai_debate_runs || 0) + (usage.aiDebateRuns || 0);
    
    // Upsert the usage record
    const { error: upsertError } = await supabase
      .from('api_usage')
      .upsert(newUsage);
    
    if (upsertError) {
      logStep("Error updating API usage", upsertError);
    }
  } catch (error) {
    logStep("Error recording API usage", error);
  }
}

// AI content generation functions
async function generateStrategies(industry: string, riskAppetite: string, companyName: string, companyDetails: any) {
  // In a production environment, this would use an actual OpenAI API call
  // This is a mock implementation for demonstration
  const strategies = [
    {
      title: `${industry} Growth Strategy: Market Expansion`,
      description: `A comprehensive strategy to expand ${companyName}'s market share in the ${industry} sector, focusing on geographic expansion and customer acquisition.`,
      executive: "Elon Musk",
      riskLevel: riskAppetite === "high" ? "high" : "medium",
      implementationSteps: ["Market research", "Identify target regions", "Develop expansion plan", "Execute marketing campaign", "Measure results"],
      estimatedCost: "$5,000 - $15,000",
      estimatedTime: "3-6 months",
      requiredResources: ["Marketing team", "Market research tools", "Budget for campaign", "Sales representatives"],
      expectedOutcome: "20-30% increase in customer base within target regions",
      potentialRisks: ["Market saturation", "Competitive response", "Higher than expected costs"]
    },
    {
      title: `Operational Efficiency Improvement for ${companyName}`,
      description: `A strategy to optimize internal processes and reduce operational costs while maintaining or improving service quality.`,
      executive: "Warren Buffett",
      riskLevel: "low",
      implementationSteps: ["Process audit", "Identify inefficiencies", "Develop improvement plan", "Implement changes", "Measure results"],
      estimatedCost: "$2,000 - $5,000",
      estimatedTime: "2-4 months",
      requiredResources: ["Operations team", "Process documentation", "Potential software tools", "Training resources"],
      expectedOutcome: "15-25% reduction in operational costs",
      potentialRisks: ["Employee resistance", "Initial productivity dip", "Process disruption"]
    },
    {
      title: riskAppetite === "high" ? "Disruptive Innovation Initiative" : "Incremental Product Improvement",
      description: riskAppetite === "high" 
        ? `A bold strategy to create disruptive innovation in the ${industry} sector, positioning ${companyName} as a thought leader.`
        : `A measured approach to improving existing products/services based on customer feedback and market trends.`,
      executive: riskAppetite === "high" ? "Elon Musk" : "Warren Buffett",
      riskLevel: riskAppetite,
      implementationSteps: riskAppetite === "high" 
        ? ["Innovation workshop", "Identify disruption opportunities", "Prototype development", "Market testing", "Full launch"]
        : ["Customer feedback analysis", "Identify improvement areas", "Develop enhancements", "Test improvements", "Roll out changes"],
      estimatedCost: riskAppetite === "high" ? "$15,000 - $50,000" : "$5,000 - $10,000",
      estimatedTime: riskAppetite === "high" ? "6-12 months" : "2-4 months",
      requiredResources: ["R&D team", "Development resources", "Market testing group", "Marketing materials"],
      expectedOutcome: riskAppetite === "high" 
        ? "Potential for 50-100% growth in new market segments"
        : "10-20% improvement in customer satisfaction and retention",
      potentialRisks: riskAppetite === "high" 
        ? ["High failure rate", "Significant investment risk", "Market rejection"]
        : ["Limited impact", "Competitor matching", "Implementation challenges"]
    }
  ];
  
  return strategies;
}

async function generateCampaigns(industry: string, companyName: string, companyDetails: any) {
  // Mock implementation
  const campaigns = [
    {
      name: `${industry} Awareness Campaign`,
      description: `A targeted social media campaign to increase brand awareness for ${companyName} in the ${industry} sector.`,
      executive: "Antonio Lucio",
      platform: "Social Media",
      targetAudience: "Industry professionals and decision-makers",
      budget: 2500,
      duration: "30 days",
      expectedOutcome: "25-30% increase in brand recognition, 15% increase in website traffic"
    },
    {
      name: "Lead Generation Webinar Series",
      description: `A series of educational webinars positioning ${companyName} as an authority in ${industry} while generating qualified leads.`,
      executive: "Antonio Lucio",
      platform: "Webinar",
      targetAudience: "Potential customers and industry stakeholders",
      budget: 1500,
      duration: "3 months (one webinar per month)",
      expectedOutcome: "100-150 new leads, 10-15 direct sales opportunities"
    },
    {
      name: "Customer Success Story Campaign",
      description: `Highlighting real success stories from ${companyName}'s customers to build credibility and showcase results.`,
      executive: "Antonio Lucio",
      platform: "Multi-channel",
      targetAudience: "Prospective customers similar to featured case studies",
      budget: 2000,
      duration: "45 days",
      expectedOutcome: "20% increase in conversion rate for similar prospects"
    }
  ];
  
  return campaigns;
}

async function generateCallScripts(industry: string, companyName: string, companyDetails: any) {
  // Mock implementation
  const scripts = [
    {
      title: "Initial Prospect Outreach Script",
      scriptText: `Hello [Prospect Name], this is [Your Name] from ${companyName}. We help companies in the ${industry} sector [brief value proposition]. Many of our clients have been facing challenges with [common industry pain point]. Is that something your team has experienced as well?\n\n[Wait for response]\n\nI'd love to share how we've helped similar organizations overcome these challenges. Would you be open to a brief 15-minute call next week to discuss how we might be able to help?\n\n[Schedule call or handle objection]`,
      executive: "Mike Weinberg",
      targetAudience: "Cold prospects in target market",
      purpose: "Initial outreach to schedule discovery call",
      estimatedDuration: "2-3 minutes",
      keyPoints: ["Establish connection to industry", "Reference common pain point", "Request brief follow-up call", "Be respectful of time"],
      objectionHandling: {
        "No time": "I completely understand. When would be a better time for us to connect? I promise to be brief and focused on value.",
        "Not interested": "I appreciate your candor. May I ask what solutions you're currently using for [pain point]?",
        "Already have a solution": "That's great to hear. Many of our current clients came to us when looking to optimize their existing solution. What aspects of your current setup work well for you?"
      }
    },
    {
      title: "Follow-up Call After Website Visit",
      scriptText: `Hello [Prospect Name], this is [Your Name] from ${companyName}. I noticed you recently visited our website and checked out our [specific solution] page. I thought I'd reach out to see if you had any questions I could answer about how we help companies in the ${industry} space.\n\n[Wait for response]\n\nCould you share a bit about what challenges you're looking to solve? This would help me understand if and how we might be able to assist.\n\n[Based on response, share relevant case study or specific benefits]`,
      executive: "Trish Bertuzzi",
      targetAudience: "Warm leads who visited website",
      purpose: "Convert website visitor to sales conversation",
      estimatedDuration: "5-7 minutes",
      keyPoints: ["Reference website visit", "Ask open-ended questions", "Listen more than talk", "Provide relevant proof points"],
      objectionHandling: {
        "Just researching": "Research is an important step. Which specific aspects of [solution] are you most interested in learning about?",
        "Too expensive": "I understand budget is a consideration. Many of our clients found that while the initial investment seemed significant, the ROI was achieved within [timeframe]. Would it be valuable to walk through a typical ROI calculation for a company like yours?"
      }
    }
  ];
  
  return scripts;
}

async function generateAIDebate(industry: string, riskAppetite: string, companyName: string, companyDetails: any) {
  // Mock implementation
  const debate = {
    title: `Strategic Direction Debate: Growth Strategies for ${companyName}`,
    context: `This debate explores the best strategic approaches for ${companyName}, a ${companyDetails.size} company in the ${industry} industry with a ${riskAppetite} risk appetite.`,
    participants: [
      { name: "Elon Musk", role: "Innovation Advocate", perspective: "Disruptive innovation and bold moves" },
      { name: "Warren Buffett", role: "Financial Strategist", perspective: "Sustainable growth and capital preservation" },
      { name: "Antonio Lucio", role: "Marketing Expert", perspective: "Brand-building and market perception" }
    ],
    transcript: [
      {
        speaker: "Elon Musk",
        text: `${companyName} has an opportunity to disrupt the ${industry} market completely. I recommend investing heavily in cutting-edge technology and taking bold risks to establish a dominant position. The companies that make big bets will own the future.`
      },
      {
        speaker: "Warren Buffett",
        text: `I disagree with that approach. ${companyName} should focus on sustainable growth through capital efficiency and excellent execution. Build a moat around your core business first. Risk management is essential, especially considering the company's current size and resources.`
      },
      {
        speaker: "Antonio Lucio",
        text: `Both perspectives have merit, but we also need to consider brand positioning. ${companyName} should identify where it can authentically stand out in the ${industry} and build a compelling brand narrative around that. Marketing isn't just promotion; it's about finding the unique value proposition.`
      },
      {
        speaker: "Warren Buffett",
        text: `I agree that differentiation is important, but it should be built on a foundation of financial discipline. Too many companies chase growth at the expense of profitability and end up in trouble. ${companyName} should invest in opportunities with clear return metrics.`
      },
      {
        speaker: "Elon Musk",
        text: `The problem with overly cautious approaches is that they leave you vulnerable to disruption. In today's ${industry} landscape, if you're not moving forward aggressively, you're moving backward. ${companyName} needs to be willing to cannibalize its own business before someone else does.`
      },
      {
        speaker: "Antonio Lucio",
        text: `What if we strike a balance? ${companyName} could allocate 70% of resources to strengthening and growing the core business with Warren's disciplined approach, 20% to adjacent opportunities with moderate risk, and 10% to the truly disruptive "moonshots" that Elon advocates.`
      }
    ],
    conclusion: `After a spirited debate, the executives agreed that ${companyName} should adopt a portfolio approach to growth strategies, with the specific allocation of resources dependent on the company's risk appetite. For a company with ${riskAppetite} risk appetite, the recommendation leans toward ${riskAppetite === 'high' ? 'more aggressive innovation and market disruption' : riskAppetite === 'medium' ? 'a balanced approach with calculated risks' : 'a more conservative strategy with emphasis on sustainable growth'}.`,
    recommendation: riskAppetite === 'high' 
      ? `Invest heavily in innovation and market disruption while maintaining financial discipline; pursue opportunities to redefine the ${industry} space.` 
      : riskAppetite === 'medium' 
        ? `Balance growth initiatives with risk management; allocate resources across a portfolio of opportunities with varying risk-reward profiles.` 
        : `Focus on optimizing core operations and making incremental improvements; prioritize capital efficiency and sustainable growth over rapid expansion.`
  };
  
  return debate;
}
