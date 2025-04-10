import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key is not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Parse request body
    const { userId, companyId, industry, riskAppetite, companyName, companyDetails } = await req.json();

    if (!userId || !companyId || !industry) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get risk level to select appropriate executives
    const riskLevel = riskAppetite || 'medium';
    
    // Get executive team based on risk appetite
    const executives = getExecutiveTeam(riskLevel);
    
    // Generate strategies first
    console.log("Generating strategies for", companyName, "in", industry);
    const strategies = await generateStrategies(
      OPENAI_API_KEY,
      companyName,
      industry,
      riskLevel,
      executives,
      companyDetails
    );
    
    // Store strategies in the database
    if (strategies && strategies.length > 0) {
      for (const strategy of strategies) {
        const { error: strategyError } = await supabase
          .from("strategies")
          .insert({
            company_id: companyId,
            title: strategy.title,
            description: strategy.description,
            risk_level: strategy.riskLevel,
            executive_bot: strategy.proposedBy,
            focus_areas: strategy.focusAreas,
            key_actions: strategy.keyActions,
            estimated_roi: strategy.estimatedROI,
            implementation_timeline: strategy.implementationTimeline
          });
          
        if (strategyError) {
          console.error("Error storing strategy:", strategyError);
        }
      }
    }
    
    // Generate campaigns
    console.log("Generating campaigns for", companyName);
    const campaigns = await generateCampaigns(
      OPENAI_API_KEY,
      companyName,
      industry,
      riskLevel,
      executives,
      companyDetails
    );
    
    // Store campaigns in the database
    if (campaigns && campaigns.length > 0) {
      for (const campaign of campaigns) {
        const { error: campaignError } = await supabase
          .from("campaigns")
          .insert({
            company_id: companyId,
            name: campaign.name,
            description: campaign.description,
            type: campaign.type,
            target_audience: campaign.targetAudience,
            channel: campaign.channel,
            status: 'draft',
            executive_bot: campaign.proposedBy,
            messages: campaign.messages
          });
          
        if (campaignError) {
          console.error("Error storing campaign:", campaignError);
        }
      }
    }
    
    // Generate AI boardroom debate
    console.log("Generating boardroom debate for", companyName);
    const debate = await generateBoardroomDebate(
      OPENAI_API_KEY,
      companyName,
      industry,
      strategies,
      executives,
      companyDetails
    );
    
    // Store debate in the database
    if (debate) {
      const { error: debateError } = await supabase
        .from("ai_boardroom_debates")
        .insert({
          company_id: companyId,
          topic: debate.topic,
          summary: debate.summary,
          executives: debate.executives,
          discussion: debate.discussion,
          conclusion: debate.conclusion,
          created_at: new Date().toISOString()
        });
        
      if (debateError) {
        console.error("Error storing boardroom debate:", debateError);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        strategies: strategies.length,
        campaigns: campaigns.length,
        debate: debate ? true : false 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-ai-content function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Helper function to get executive team based on risk appetite
function getExecutiveTeam(riskLevel: string): Array<{ name: string; role: string; }> {
  const executives = {
    low: [
      { name: "Warren Buffett", role: "Chief Investment Advisor" },
      { name: "Satya Nadella", role: "Technology Strategy" },
      { name: "Mary Barra", role: "Operations Executive" },
      { name: "Tim Cook", role: "Supply Chain & Execution" }
    ],
    medium: [
      { name: "Sheryl Sandberg", role: "COO & Growth Strategy" },
      { name: "Jeff Bezos", role: "Business Expansion" },
      { name: "Trish Bertuzzi", role: "Sales Innovation" },
      { name: "Brian Chesky", role: "Customer Experience" }
    ],
    high: [
      { name: "Elon Musk", role: "Chief Innovation Officer" },
      { name: "Steve Jobs", role: "Product Visionary" },
      { name: "Mike Weinberg", role: "Sales Strategy" },
      { name: "Gary Vaynerchuk", role: "Marketing Disruption" }
    ]
  };

  // Default to medium if risk appetite is not recognized
  return executives[riskLevel as keyof typeof executives] || executives.medium;
}

// Generate business strategies using OpenAI
async function generateStrategies(
  apiKey: string,
  companyName: string,
  industry: string,
  riskLevel: string,
  executives: Array<{ name: string; role: string; }>,
  companyDetails: any
): Promise<any[]> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a strategic business AI advisor. Create 3-5 business growth strategies for ${companyName}, a company in the ${industry} industry with a ${riskLevel} risk appetite. Each strategy should:
            1. Have a unique name and description
            2. Be attributed to a specific executive from this team: ${JSON.stringify(executives)}
            3. Include focus areas, key actions, estimated ROI, and implementation timeline
            4. Match the executive's personality and expertise
            
            Strategies should be practical, actionable, and tailored to the company and industry.`
        },
        {
          role: "user",
          content: `Generate 3-5 business growth strategies for ${companyName} in the ${industry} industry. Company details: ${JSON.stringify(companyDetails)}`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Unexpected response from OpenAI API:", data);
    return [];
  }
  
  try {
    // Extract strategies from the response
    const content = data.choices[0].message.content;
    
    // Try to parse JSON directly if the response is already JSON-formatted
    if (content.trim().startsWith('[') && content.trim().endsWith(']')) {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.log("Failed to parse direct JSON, trying to extract JSON from text");
      }
    }
    
    // Otherwise, try to extract the JSON from the text
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch && jsonMatch[0]) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    
    // If we couldn't parse JSON, create a structured response manually
    // This is a fallback method that parses text-based strategies
    const strategies = [];
    const strategyBlocks = content.split(/Strategy \d+:/);
    
    for (let i = 1; i < strategyBlocks.length; i++) {
      const block = strategyBlocks[i].trim();
      
      // Extract title
      const titleMatch = block.match(/^([^\n]+)/);
      const title = titleMatch ? titleMatch[1].trim() : `Strategy ${i}`;
      
      // Extract executive
      const executiveMatch = block.match(/proposed by ([^:\.]+)/i) || 
                            block.match(/([A-Za-z]+ [A-Za-z]+)'s strategy/i) ||
                            block.match(/([A-Za-z]+ [A-Za-z]+) recommends/i);
      const proposedBy = executiveMatch ? executiveMatch[1].trim() : executives[i % executives.length].name;
      
      // Extract description
      const descMatch = block.match(/description:([^\n]+)/i) || 
                        block.match(/^(?!.*proposed by)([^\n]+)/i);
      const description = descMatch ? descMatch[1].trim() : block.split('\n')[1];
      
      // Extract focus areas
      const focusMatch = block.match(/focus areas?:([^\n]+)/i);
      const focusAreas = focusMatch ? 
        focusMatch[1].split(',').map((area: string) => area.trim()) : 
        ["Growth", "Efficiency"];
      
      // Extract key actions
      const actionsMatch = block.match(/key actions?:([^]*?)(?:estimated roi|implementation timeline|$)/i);
      const keyActions = actionsMatch ? 
        actionsMatch[1].split(/\n\s*\-/).filter(Boolean).map((action: string) => action.trim()) : 
        ["Action 1", "Action 2"];
      
      // Extract ROI
      const roiMatch = block.match(/estimated roi:([^\n]+)/i);
      const estimatedROI = roiMatch ? roiMatch[1].trim() : "20-30% within 12 months";
      
      // Extract timeline
      const timelineMatch = block.match(/implementation timeline:([^\n]+)/i);
      const implementationTimeline = timelineMatch ? timelineMatch[1].trim() : "3-6 months";
      
      strategies.push({
        title,
        description,
        riskLevel: riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1),
        proposedBy,
        focusAreas,
        keyActions,
        estimatedROI,
        implementationTimeline
      });
    }
    
    return strategies.length > 0 ? strategies : [];
  } catch (error) {
    console.error("Error parsing strategies from OpenAI response:", error);
    return [];
  }
}

// Generate marketing campaigns using OpenAI
async function generateCampaigns(
  apiKey: string,
  companyName: string,
  industry: string,
  riskLevel: string,
  executives: Array<{ name: string; role: string; }>,
  companyDetails: any
): Promise<any[]> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a marketing campaign AI advisor. Create 3-5 WhatsApp marketing campaigns for ${companyName}, a company in the ${industry} industry. Each campaign should:
            1. Have a unique name and description
            2. Be attributed to a specific executive from this team: ${JSON.stringify(executives)}
            3. Include campaign type, target audience, and communication channel
            4. Include 3-5 sample WhatsApp messages for the campaign
            
            Campaigns should be practical, comply with WhatsApp Business guidelines, and tailored to the company and industry.`
        },
        {
          role: "user",
          content: `Generate 3-5 WhatsApp marketing campaigns for ${companyName} in the ${industry} industry. Company details: ${JSON.stringify(companyDetails)}`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Unexpected response from OpenAI API:", data);
    return [];
  }
  
  try {
    // Extract campaigns from the response
    const content = data.choices[0].message.content;
    
    // Try to parse JSON directly if the response is already JSON-formatted
    if (content.trim().startsWith('[') && content.trim().endsWith(']')) {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.log("Failed to parse direct JSON, trying to extract JSON from text");
      }
    }
    
    // Otherwise, try to extract the JSON from the text
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch && jsonMatch[0]) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    
    // If we couldn't parse JSON, create a structured response manually
    // This is a fallback method that parses text-based campaigns
    const campaigns = [];
    const campaignBlocks = content.split(/Campaign \d+:|WhatsApp Campaign \d+:/);
    
    for (let i = 1; i < campaignBlocks.length; i++) {
      const block = campaignBlocks[i].trim();
      
      // Extract name
      const nameMatch = block.match(/name:([^\n]+)/i) || block.match(/^([^\n]+)/);
      const name = nameMatch ? nameMatch[1].trim() : `Campaign ${i}`;
      
      // Extract executive
      const executiveMatch = block.match(/proposed by ([^:\.]+)/i) || 
                            block.match(/([A-Za-z]+ [A-Za-z]+)'s campaign/i) ||
                            block.match(/([A-Za-z]+ [A-Za-z]+) recommends/i);
      const proposedBy = executiveMatch ? executiveMatch[1].trim() : executives[i % executives.length].name;
      
      // Extract description
      const descMatch = block.match(/description:([^\n]+)/i);
      const description = descMatch ? descMatch[1].trim() : "";
      
      // Extract type
      const typeMatch = block.match(/type:([^\n]+)/i) || 
                        block.match(/campaign type:([^\n]+)/i);
      const type = typeMatch ? typeMatch[1].trim() : "Promotional";
      
      // Extract target audience
      const audienceMatch = block.match(/target audience:([^\n]+)/i);
      const targetAudience = audienceMatch ? audienceMatch[1].trim() : "All customers";
      
      // Extract channel
      const channel = "WhatsApp";
      
      // Extract messages
      const messagesMatch = block.match(/sample messages?:([^]*?)(?:campaign \d+:|$)/i) ||
                           block.match(/messages?:([^]*?)(?:campaign \d+:|$)/i);
      let messages = [];
      
      if (messagesMatch) {
        messages = messagesMatch[1]
          .split(/\n\s*\d+\.\s|\n\s*\-\s/)
          .filter(Boolean)
          .map((msg: string) => msg.trim())
          .filter((msg: string) => msg.length > 10);
      } else {
        // Try to extract numbered messages
        const msgRegex = /\d+\.\s+"([^"]+)"/g;
        let match;
        while ((match = msgRegex.exec(block)) !== null) {
          messages.push(match[1].trim());
        }
      }
      
      // If we still don't have messages, try to extract anything that looks like a message
      if (messages.length === 0) {
        const msgQuotes = block.match(/"([^"]+)"/g);
        if (msgQuotes) {
          messages = msgQuotes.map((quote: string) => quote.replace(/"/g, '').trim());
        }
      }
      
      // Ensure we have at least one message
      if (messages.length === 0) {
        messages = [`Hello from ${companyName}! We have exciting news to share.`];
      }
      
      campaigns.push({
        name,
        description,
        type,
        targetAudience,
        channel,
        proposedBy,
        messages
      });
    }
    
    return campaigns.length > 0 ? campaigns : [];
  } catch (error) {
    console.error("Error parsing campaigns from OpenAI response:", error);
    return [];
  }
}

// Generate AI boardroom debate using OpenAI
async function generateBoardroomDebate(
  apiKey: string,
  companyName: string,
  industry: string,
  strategies: any[],
  executives: Array<{ name: string; role: string; }>,
  companyDetails: any
): Promise<any> {
  // Prepare strategy titles for the prompt
  const strategyTitles = strategies.map(s => s.title).join(", ");
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a business debate simulator. Create a realistic boardroom debate between these executives: ${JSON.stringify(executives)} discussing growth strategies for ${companyName}, a company in the ${industry} industry. 
          
          The debate should:
          1. Focus on the strategies: ${strategyTitles}
          2. Show each executive's perspective based on their real-world expertise and personality
          3. Include points of agreement, disagreement, and final consensus
          4. Be structured as a JSON object with: topic, summary, executives array, discussion array (with speaker and message), and conclusion
          
          Make it realistic, insightful, and reflect how these executives would actually debate in real life.`
        },
        {
          role: "user",
          content: `Generate a boardroom debate between the executives about growth strategies for ${companyName}. Company details: ${JSON.stringify(companyDetails)}`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Unexpected response from OpenAI API:", data);
    return null;
  }
  
  try {
    // Extract debate from the response
    const content = data.choices[0].message.content;
    
    // Try to parse JSON directly if the response is already JSON-formatted
    if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.log("Failed to parse direct JSON, trying to extract JSON from text");
      }
    }
    
    // Otherwise, try to extract the JSON from the text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch && jsonMatch[0]) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    
    // If we couldn't parse JSON, create a structured response manually
    console.error("Could not parse debate as JSON, returning null");
    return null;
  } catch (error) {
    console.error("Error parsing debate from OpenAI response:", error);
    return null;
  }
}
