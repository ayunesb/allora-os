
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define AI executive personalities
const aiExecutives = {
  strategists: ["Elon Musk", "Warren Buffett", "Tim Cook", "Steve Jobs"],
  marketers: ["Antonio Lucio", "Keith Weed"],
  salesCoaches: ["Mike Weinberg", "Trish Bertuzzi", "Sheryl Sandberg"]
};

// Define risk level categories
const riskLevels = ["Low Risk", "Medium Risk", "High Risk"];

// Define campaign types
const campaignTypes = ["Facebook", "Instagram", "LinkedIn", "TikTok", "Email", "SMS"];

// Generate business strategies based on company profile
async function generateStrategies(companyProfile: any) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  const strategyPrompt = `
    Generate 15-20 fresh business strategies for the following company:
    
    Company Name: ${companyProfile.companyName || 'Unknown'}
    Industry: ${companyProfile.industry || 'Unknown'}
    Company Size: ${companyProfile.companySize || 'Unknown'}
    Website: ${companyProfile.website || 'Unknown'}
    Top 3 Goals: ${companyProfile.topGoals?.join(', ') || 'Growth, Efficiency, Innovation'}
    Target Markets: ${companyProfile.targetMarkets?.join(', ') || 'Unknown'}
    Risk Appetite: ${companyProfile.riskAppetite || 'Medium'}
    Current Sales Channels: ${companyProfile.salesChannels?.join(', ') || 'Unknown'}
    
    Categorize each strategy as Low Risk, Medium Risk, or High Risk.
    
    For each strategy, provide:
    1. Title
    2. Executive Summary (2-3 sentences)
    3. Expected Outcome
    4. Which AI Executive proposed it (choose from: ${aiExecutives.strategists.join(', ')})
    5. Why this strategy matters
    
    Format the response as JSON with the following structure:
    {
      "strategies": [
        {
          "title": "Strategy Title",
          "summary": "Executive summary here",
          "expectedOutcome": "Expected outcome here",
          "proposedBy": "Executive Name",
          "why": "Why this strategy matters",
          "riskLevel": "Low Risk/Medium Risk/High Risk"
        }
      ]
    }
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI Executive Board consisting of legendary business figures. Generate business strategies in JSON format only.' },
          { role: 'user', content: strategyPrompt }
        ],
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    // Parse the response to extract the JSON
    const content = data.choices[0].message.content;
    try {
      // The response may have markdown formatting, so we need to extract just the JSON
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/({[\s\S]*})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing JSON from OpenAI response:", parseError);
      // Fallback: return the raw content if parsing fails
      return { strategies: [], rawResponse: content };
    }
  } catch (error) {
    console.error("Error generating strategies:", error);
    throw error;
  }
}

// Generate marketing campaigns based on company profile
async function generateCampaigns(companyProfile: any) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  const campaignPrompt = `
    Generate marketing campaign ideas for the following company:
    
    Company Name: ${companyProfile.companyName || 'Unknown'}
    Industry: ${companyProfile.industry || 'Unknown'}
    Target Markets: ${companyProfile.targetMarkets?.join(', ') || 'Unknown'}
    Monthly Marketing Budget: ${companyProfile.marketingBudget || 'Unknown'}
    Main Marketing Channels: ${companyProfile.marketingChannels?.join(', ') || 'Unknown'}
    Tone of Messaging: ${companyProfile.messagingTone || 'Professional'}
    
    Create campaign ideas for: Facebook, Instagram, LinkedIn, TikTok, Email, and SMS.
    
    For each campaign, provide:
    1. Objective
    2. Target Audience
    3. Short Script or Copy
    4. Which AI Marketing Executive recommends it (choose from: ${aiExecutives.marketers.join(', ')})
    
    Format the response as JSON with the following structure:
    {
      "campaigns": [
        {
          "platform": "Platform Name",
          "objective": "Campaign objective",
          "targetAudience": "Target audience description",
          "script": "Short script or copy",
          "recommendedBy": "Executive Name"
        }
      ]
    }
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI Marketing Executive Board consisting of legendary marketing figures. Generate marketing campaigns in JSON format only.' },
          { role: 'user', content: campaignPrompt }
        ],
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    // Parse the response to extract the JSON
    const content = data.choices[0].message.content;
    try {
      // The response may have markdown formatting, so we need to extract just the JSON
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/({[\s\S]*})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing JSON from OpenAI response:", parseError);
      // Fallback: return the raw content if parsing fails
      return { campaigns: [], rawResponse: content };
    }
  } catch (error) {
    console.error("Error generating campaigns:", error);
    throw error;
  }
}

// Generate communication scripts based on company profile
async function generateScripts(companyProfile: any) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  const scriptPrompt = `
    Generate communication scripts for the following company:
    
    Company Name: ${companyProfile.companyName || 'Unknown'}
    Industry: ${companyProfile.industry || 'Unknown'}
    Target Markets: ${companyProfile.targetMarkets?.join(', ') || 'Unknown'}
    Communication Methods: ${companyProfile.communicationMethods?.join(', ') || 'Phone, Email, SMS'}
    Tone of Messaging: ${companyProfile.messagingTone || 'Professional'}
    
    Create the following scripts:
    1. Cold Call Script (B2B focus)
    2. SMS Follow-up Template
    3. Email Follow-up Template
    
    Attribute each script to one of these sales coaches: ${aiExecutives.salesCoaches.join(', ')}
    
    Format the response as JSON with the following structure:
    {
      "scripts": [
        {
          "type": "Cold Call/SMS/Email",
          "script": "Full script content",
          "attributedTo": "Sales Coach Name"
        }
      ]
    }
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI Sales Coaching Board consisting of legendary sales figures. Generate sales scripts in JSON format only.' },
          { role: 'user', content: scriptPrompt }
        ],
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    // Parse the response to extract the JSON
    const content = data.choices[0].message.content;
    try {
      // The response may have markdown formatting, so we need to extract just the JSON
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/({[\s\S]*})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing JSON from OpenAI response:", parseError);
      // Fallback: return the raw content if parsing fails
      return { scripts: [], rawResponse: content };
    }
  } catch (error) {
    console.error("Error generating scripts:", error);
    throw error;
  }
}

// Simulate an AI executive debate
async function simulateExecutiveDebate(companyProfile: any, strategies: any[]) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  const debatePrompt = `
    Simulate a real-time debate among the AI Executive Board on business strategies for the following company:
    
    Company Name: ${companyProfile.companyName || 'Unknown'}
    Industry: ${companyProfile.industry || 'Unknown'}
    Risk Appetite: ${companyProfile.riskAppetite || 'Medium'}
    
    The following executives are participating in the debate:
    ${aiExecutives.strategists.join(', ')}
    
    They are debating these top strategies:
    ${strategies.slice(0, 3).map(s => `- ${s.title} (proposed by ${s.proposedBy})`).join('\n')}
    
    Include in the debate simulation:
    1. Initial proposals
    2. Disagreements and counterpoints
    3. Final consensus or decision summary
    
    Format the response as JSON with the following structure:
    {
      "debate": [
        {
          "executive": "Executive Name",
          "statement": "What they said",
          "position": "For/Against/Neutral"
        }
      ],
      "summary": "Final decision summary"
    }
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are simulating a debate among an AI Executive Board consisting of legendary business figures. Generate the debate in JSON format only.' },
          { role: 'user', content: debatePrompt }
        ],
        temperature: 0.8,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    // Parse the response to extract the JSON
    const content = data.choices[0].message.content;
    try {
      // The response may have markdown formatting, so we need to extract just the JSON
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/({[\s\S]*})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing JSON from OpenAI response:", parseError);
      // Fallback: return the raw content if parsing fails
      return { debate: [], summary: "", rawResponse: content };
    }
  } catch (error) {
    console.error("Error simulating debate:", error);
    throw error;
  }
}

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, companyProfile } = await req.json();

    if (!companyProfile) {
      throw new Error('Company profile is required');
    }

    let responseData = {};

    switch (action) {
      case 'generate_strategies':
        responseData = await generateStrategies(companyProfile);
        break;
        
      case 'generate_campaigns':
        responseData = await generateCampaigns(companyProfile);
        break;
        
      case 'generate_scripts':
        responseData = await generateScripts(companyProfile);
        break;
        
      case 'simulate_debate':
        // For the debate, we need the top strategies
        const strategies = await generateStrategies(companyProfile);
        responseData = await simulateExecutiveDebate(companyProfile, strategies.strategies || []);
        break;
        
      case 'generate_all':
        // Generate everything at once
        const allStrategies = await generateStrategies(companyProfile);
        const allCampaigns = await generateCampaigns(companyProfile);
        const allScripts = await generateScripts(companyProfile);
        const debate = await simulateExecutiveDebate(companyProfile, allStrategies.strategies || []);
        
        responseData = {
          strategies: allStrategies.strategies || [],
          campaigns: allCampaigns.campaigns || [],
          scripts: allScripts.scripts || [],
          debate: debate.debate || [],
          debateSummary: debate.summary || ""
        };
        break;
        
      case 'refresh_strategies':
        // Generate 5 new strategies
        const refreshPrompt = {
          ...companyProfile,
          refreshRequest: true,
          numStrategies: 5
        };
        responseData = await generateStrategies(refreshPrompt);
        break;
        
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI Executive Workflow function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
