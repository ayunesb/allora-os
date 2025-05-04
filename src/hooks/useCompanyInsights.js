import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { executiveBots } from '@/backend/executiveBots';
export function useCompanyInsights() {
    const { profile, user } = useAuth();
    const [insights, setInsights] = useState([]);
    const [detailedInsights, setDetailedInsights] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Only generate insights when we have a profile with company info
        if (!profile || !user?.id) {
            setIsLoading(false);
            return;
        }
        const generateInsights = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // In a production app, this would be an API call to fetch insights
                // based on company data. For now, we'll generate detailed insights locally.
                // If a company name exists, generate insights based on it
                const hasCompanyInfo = Boolean(profile.company);
                if (!hasCompanyInfo) {
                    setInsights([]);
                    setIsLoading(false);
                    return;
                }
                const companyName = profile.company || "Your Company";
                const industry = profile.industry || "Technology";
                const companyGoals = profile.goals || [];
                const riskAppetite = profile.risk_appetite || "Medium";
                // Generate insights with appropriate bots for each insight type
                const newInsights = generateCompanySpecificInsights(companyName, industry, companyGoals, riskAppetite);
                const detailedInsightsMap = generateDetailedInsightData(newInsights, companyName, industry, companyGoals, riskAppetite);
                // Wait for a brief moment to simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));
                setInsights(newInsights);
                setDetailedInsights(detailedInsightsMap);
            }
            catch (err) {
                console.error('Error generating insights:', err);
                setError(err.message || 'Failed to generate company insights');
                toast.error('Failed to generate insights');
            }
            finally {
                setIsLoading(false);
            }
        };
        generateInsights();
    }, [profile, user?.id]);
    const getDetailedInsight = (insightId) => {
        return detailedInsights[insightId] || null;
    };
    return {
        insights,
        isLoading,
        error,
        getDetailedInsight
    };
}
// Helper function to generate insights based on company data
function generateCompanySpecificInsights(companyName, industry, goals = [], riskAppetite = "Medium") {
    // Generate a unique ID based on company name to ensure consistency
    const generateId = (prefix) => `${prefix}-${companyName.toLowerCase().replace(/\s+/g, '-')}`;
    // Get the current date
    const now = new Date();
    // Select appropriate bots for each insight type
    const strategyBots = getBotsForRole('strategy', 'ceo', 'cmo');
    const campaignBots = getBotsForRole('marketing', 'sales_business_development', 'cmo');
    const callScriptBots = getBotsForRole('lead_qualification', 'sales_business_development', 'cold_calling');
    // Generate strategy title based on industry and goals
    const strategyTitle = goals.includes('growth')
        ? `${industry} Market Expansion Strategy for ${companyName}`
        : goals.includes('innovation')
            ? `Disruptive Innovation Blueprint for ${companyName} in ${industry}`
            : `Strategic Growth Plan for ${companyName} in ${industry}`;
    // Generate campaign title based on industry
    const campaignTitle = goals.includes('revenue')
        ? `High-ROI ${industry} Targeted LinkedIn Campaign`
        : goals.includes('acquisition')
            ? `Customer Acquisition Campaign for ${companyName}`
            : `Q3 ${industry} Market Penetration Campaign`;
    // Generate call script title based on goals
    const callScriptTitle = goals.includes('enterprise')
        ? `Enterprise Solution Pitch for ${industry} Clients`
        : `Value Proposition Script for ${companyName} in ${industry}`;
    return [
        // Strategy insight
        {
            id: generateId('strategy'),
            title: strategyTitle,
            description: `A comprehensive growth strategy tailored for ${companyName} in the ${industry} sector, focusing on ${goals.includes('growth') ? 'market penetration' :
                goals.includes('innovation') ? 'disruptive innovation' :
                    'competitive positioning'}. Risk profile: ${riskAppetite}.`,
            type: 'strategy',
            primaryBot: strategyBots.primary,
            collaborators: strategyBots.collaborators,
            createdAt: new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 5)))
        },
        // Campaign insight
        {
            id: generateId('campaign'),
            title: campaignTitle,
            description: `Proposal for a high-ROI ${goals.includes('revenue') ? 'revenue-focused' :
                goals.includes('acquisition') ? 'customer acquisition' :
                    'brand awareness'} campaign targeting decision-makers in the ${industry} space with personalized messaging and content strategy.`,
            type: 'campaign',
            primaryBot: campaignBots.primary,
            collaborators: campaignBots.collaborators,
            createdAt: new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 3)))
        },
        // Call script insight
        {
            id: generateId('call_script'),
            title: callScriptTitle,
            description: `High-conversion call script designed to communicate ${companyName}'s value proposition to ${goals.includes('enterprise') ? 'enterprise-level' :
                goals.includes('startup') ? 'startup' :
                    'mid-market'} prospects in the ${industry} industry.`,
            type: 'call_script',
            primaryBot: callScriptBots.primary,
            collaborators: callScriptBots.collaborators,
            createdAt: new Date()
        }
    ];
}
// Generate detailed insight data for each insight
function generateDetailedInsightData(insights, companyName, industry, goals = [], riskAppetite = "Medium") {
    const detailedInsights = {};
    insights.forEach(insight => {
        let keyPoints = [];
        let reasoning = "";
        let executiveSummary = "";
        let contributors = [];
        // Generate content based on insight type
        if (insight.type === 'strategy') {
            keyPoints = [
                `${riskAppetite === 'High' ? 'Aggressive' : riskAppetite === 'Low' ? 'Conservative' : 'Balanced'} expansion into new ${industry} market segments`,
                `Focus on ${goals.includes('innovation') ? 'product innovation' : goals.includes('revenue') ? 'revenue optimization' : 'customer retention'}`,
                `${riskAppetite === 'High' ? 'Fast-tracked' : riskAppetite === 'Low' ? 'Phased' : 'Strategic'} implementation timeline`,
                `${goals.includes('partnerships') ? 'Strategic partnerships' : 'Organic growth'} as primary growth driver`
            ];
            reasoning = `This strategy was developed with a primary focus on ${companyName}'s stated goal of ${goals.length > 0 ? goals[0] : 'growth'} within the ${industry} sector. Given the ${riskAppetite.toLowerCase()} risk appetite, we've prioritized ${riskAppetite === 'High' ? 'bold, high-reward initiatives that could disrupt the market' :
                riskAppetite === 'Low' ? 'stable, proven approaches that minimize downside risk' :
                    'a balanced approach that combines innovation with measured execution'}.`;
            executiveSummary = `A ${riskAppetite.toLowerCase()}-risk strategy focused on ${goals.length > 0 ? goals.join(' and ') : 'growth and innovation'} within the ${industry} space, designed to position ${companyName} for sustainable competitive advantage.`;
            // Add strategy-specific contributors
            contributors = [
                {
                    name: insight.primaryBot.name,
                    role: insight.primaryBot.role,
                    contribution: "Led the overall strategy development and framework design",
                    opinion: 'positive'
                },
                {
                    name: "Warren Buffett",
                    role: "cfo",
                    contribution: `Provided financial viability analysis and ${riskAppetite.toLowerCase()}-risk investment approach`,
                    opinion: 'neutral'
                },
                {
                    name: "Reed Hastings",
                    role: "strategy",
                    contribution: `Contributed disruptive market entry tactics for the ${industry} sector`,
                    opinion: riskAppetite === 'High' ? 'positive' : 'neutral'
                },
                {
                    name: "Satya Nadella",
                    role: "ceo",
                    contribution: "Advised on technology integration and digital transformation elements",
                    opinion: 'positive'
                }
            ];
        }
        else if (insight.type === 'campaign') {
            keyPoints = [
                `Target audience: ${goals.includes('enterprise') ? 'Enterprise decision-makers' : 'Mid-market business leaders'} in ${industry}`,
                `Primary platform: ${goals.includes('revenue') ? 'LinkedIn & Email' : 'Social media & Content marketing'}`,
                `Budget efficiency: High ROI focus with performance-based scaling`,
                `Duration: 90-day initial campaign with built-in optimization cycles`
            ];
            reasoning = `This campaign was designed to align with ${companyName}'s ${goals.length > 0 ? goals.join(' and ') : 'growth'} objectives. The channel selection prioritizes ${goals.includes('revenue') ? 'direct response and lead generation' :
                goals.includes('brand') ? 'brand awareness and thought leadership' :
                    'engagement and conversion optimization'} based on industry benchmarks for ${industry} companies.`;
            executiveSummary = `A targeted multi-channel campaign designed to generate qualified leads and accelerate ${companyName}'s penetration in the ${industry} market.`;
            // Add campaign-specific contributors
            contributors = [
                {
                    name: insight.primaryBot.name,
                    role: insight.primaryBot.role,
                    contribution: "Developed the campaign concept and messaging strategy",
                    opinion: 'positive'
                },
                {
                    name: "Antonio Lucio",
                    role: "cmo",
                    contribution: "Refined the brand positioning and narrative approach",
                    opinion: 'positive'
                },
                {
                    name: "Gary Vaynerchuk",
                    role: "marketing",
                    contribution: "Added creative content distribution tactics",
                    opinion: 'positive'
                },
                {
                    name: "Howard Schultz",
                    role: "sales_business_development",
                    contribution: "Provided input on customer experience touchpoints",
                    opinion: 'neutral'
                }
            ];
        }
        else if (insight.type === 'call_script') {
            keyPoints = [
                `Opening: Problem-centered approach that resonates with ${industry} challenges`,
                `Value proposition: Focus on ${goals.includes('revenue') ? 'ROI and revenue impact' : 'operational efficiency'}`,
                `Objection handling: Prepared responses for common ${industry} hesitations`,
                `Call-to-action: Low-friction next steps with clear value offer`
            ];
            reasoning = `This call script was crafted using proven sales methodologies from top sales experts, with specific adaptations for the ${industry} sector. The script emphasizes ${goals.includes('enterprise') ? 'enterprise value drivers' :
                goals.includes('startup') ? 'agility and growth potential' :
                    'competitive differentiation'} while addressing common objections in this market segment.`;
            executiveSummary = `A conversion-focused call script that positions ${companyName}'s solutions as the ideal answer to key ${industry} pain points.`;
            // Add call script-specific contributors
            contributors = [
                {
                    name: insight.primaryBot.name,
                    role: insight.primaryBot.role,
                    contribution: "Architected the call flow and questioning methodology",
                    opinion: 'positive'
                },
                {
                    name: "Trish Bertuzzi",
                    role: "lead_qualification",
                    contribution: "Provided expertise on prospect qualification techniques",
                    opinion: 'positive'
                },
                {
                    name: "Mike Weinberg",
                    role: "sales_business_development",
                    contribution: "Added powerful value proposition framing",
                    opinion: 'positive'
                },
                {
                    name: "Jill Konrath",
                    role: "cold_calling",
                    contribution: "Refined the opening to increase engagement rate",
                    opinion: 'neutral'
                }
            ];
        }
        // Store the detailed insight
        detailedInsights[insight.id] = {
            ...insight,
            keyPoints,
            reasoning,
            executiveSummary,
            contributors
        };
    });
    return detailedInsights;
}
// Helper to get primary bot and collaborators for a specific insight type
function getBotsForRole(...roles) {
    // Select primary bot from first role
    const primaryRole = roles[0];
    const primaryBotName = executiveBots[primaryRole]?.[0] || 'AI Assistant';
    const primary = {
        name: primaryBotName,
        role: primaryRole,
        avatar: `/avatars/${primaryBotName.toLowerCase().replace(/\s+/g, '-')}.png`
    };
    // Create collaborators from other roles
    const collaborators = roles.slice(1).map(role => {
        const botNames = executiveBots[role] || [];
        const botName = botNames[0] || 'AI Assistant';
        const contributions = {
            strategy: 'Strategic analysis',
            ceo: 'Executive oversight',
            coo: 'Operational planning',
            cfo: 'Financial analysis',
            cmo: 'Marketing strategy',
            marketing: 'Marketing optimization',
            sales_business_development: 'Sales approach',
            lead_qualification: 'Lead qualification',
            cold_calling: 'Cold calling techniques'
        };
        return {
            name: botName,
            role,
            contribution: contributions[role] || 'Advisory support'
        };
    });
    return { primary, collaborators };
}
