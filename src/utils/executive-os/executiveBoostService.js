import { executiveBoosts } from './executiveOS';
import { logger } from '@/utils/loggingService';
/**
 * Get personalized enhancements for an executive
 */
export function getExecutiveEnhancements(botName) {
    // Default enhancements if executive is not found in the map
    const defaultEnhancements = {
        boost: { name: "Strategic thinking", type: "cognitive" },
        model: { name: "first_principles", type: "mental" }
    };
    // Find the executive in the boost map
    const boostInfo = executiveBoosts[botName];
    if (!boostInfo) {
        logger.warn(`No boost information found for executive: ${botName}. Using defaults.`);
        return defaultEnhancements;
    }
    return {
        boost: { name: boostInfo.boost, type: "cognitive" },
        model: { name: boostInfo.model, type: "mental" }
    };
}
/**
 * Helper function to determine personality traits based on executive name and role
 */
export function determinePersonalityTraits(name, role) {
    const roleLower = role.toLowerCase();
    // Specific executives
    if (name === 'Elon Musk') {
        return ['Visionary', 'Disruptive', 'Determined', 'Technical'];
    }
    else if (name === 'Jeff Bezos') {
        return ['Customer-obsessed', 'Long-term thinker', 'Detail-oriented', 'Analytical'];
    }
    else if (name === 'Satya Nadella') {
        return ['Empathetic', 'Growth mindset', 'Collaborative', 'Transformative'];
    }
    else if (name === 'Warren Buffett') {
        return ['Patient', 'Value-focused', 'Risk-aware', 'Clear communicator'];
    }
    else if (name === 'Sheryl Sandberg') {
        return ['Empowering', 'Structured', 'Communicative', 'Results-driven'];
    }
    // Role-based traits
    if (roleLower.includes('ceo')) {
        return ['Visionary', 'Decisive', 'Strategic', 'Leadership-focused'];
    }
    else if (roleLower.includes('cfo')) {
        return ['Analytical', 'Prudent', 'Detail-oriented', 'Risk-aware'];
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        return ['Innovative', 'Technical', 'Solutions-oriented', 'Forward-thinking'];
    }
    else if (roleLower.includes('cmo')) {
        return ['Creative', 'Customer-focused', 'Brand-oriented', 'Data-driven'];
    }
    else if (roleLower.includes('chro')) {
        return ['Empathetic', 'People-focused', 'Culture-builder', 'Inclusive'];
    }
    else if (roleLower.includes('strategy')) {
        return ['Analytical', 'Forward-thinking', 'Systems-oriented', 'Innovative'];
    }
    else if (roleLower.includes('sales')) {
        return ['Persuasive', 'Relationship-builder', 'Goal-oriented', 'Resilient'];
    }
    // Default traits
    return ['Strategic', 'Analytical', 'Collaborative', 'Results-oriented'];
}
/**
 * Determine the cognitive layers for an executive based on their role
 */
export function determineCognitiveLayers(role) {
    const roleLower = role.toLowerCase();
    // Define cognitive layers based on role
    const cognitiveLayers = {
        operational: {
            description: "Day-to-day execution and task management",
            capabilities: []
        },
        strategic: {
            description: "Second-order thinking and strategic planning",
            capabilities: []
        },
        innovative: {
            description: "Disruptive ideas and novel approaches",
            capabilities: []
        }
    };
    // Role-specific operational capabilities
    if (roleLower.includes('ceo')) {
        cognitiveLayers.operational.capabilities = [
            "Company vision alignment",
            "Leadership team coordination",
            "Key decision-making"
        ];
    }
    else if (roleLower.includes('cfo')) {
        cognitiveLayers.operational.capabilities = [
            "Financial oversight",
            "Budget management",
            "Financial reporting"
        ];
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        cognitiveLayers.operational.capabilities = [
            "Technology implementation",
            "System maintenance",
            "Tech team management"
        ];
    }
    else if (roleLower.includes('cmo')) {
        cognitiveLayers.operational.capabilities = [
            "Campaign execution",
            "Brand consistency",
            "Marketing performance tracking"
        ];
    }
    else if (roleLower.includes('chro')) {
        cognitiveLayers.operational.capabilities = [
            "Talent acquisition",
            "Employee engagement",
            "HR policy implementation"
        ];
    }
    else if (roleLower.includes('strategy')) {
        cognitiveLayers.operational.capabilities = [
            "Strategic initiative tracking",
            "Market analysis",
            "Competitive positioning"
        ];
    }
    // Role-specific strategic capabilities
    if (roleLower.includes('ceo')) {
        cognitiveLayers.strategic.capabilities = [
            "Market disruption planning",
            "Long-term vision development",
            "Strategic pivots identification"
        ];
    }
    else if (roleLower.includes('cfo')) {
        cognitiveLayers.strategic.capabilities = [
            "Financial forecasting",
            "Investment strategy",
            "Risk management planning"
        ];
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        cognitiveLayers.strategic.capabilities = [
            "Technology roadmapping",
            "Digital transformation strategy",
            "Technical debt management"
        ];
    }
    else if (roleLower.includes('cmo')) {
        cognitiveLayers.strategic.capabilities = [
            "Brand evolution planning",
            "Marketing channel strategy",
            "Audience development"
        ];
    }
    else if (roleLower.includes('chro')) {
        cognitiveLayers.strategic.capabilities = [
            "Organizational development",
            "Talent retention strategy",
            "Culture transformation"
        ];
    }
    else if (roleLower.includes('strategy')) {
        cognitiveLayers.strategic.capabilities = [
            "Growth opportunity identification",
            "Market expansion planning",
            "Business model innovation"
        ];
    }
    // Role-specific innovative capabilities
    if (roleLower.includes('ceo')) {
        cognitiveLayers.innovative.capabilities = [
            "Paradigm-shifting business models",
            "Industry convergence opportunities",
            "10x thinking applied to company vision"
        ];
    }
    else if (roleLower.includes('cfo')) {
        cognitiveLayers.innovative.capabilities = [
            "Novel financial structures",
            "Alternative funding mechanisms",
            "Financial technology adoption"
        ];
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        cognitiveLayers.innovative.capabilities = [
            "Emerging technology adoption",
            "R&D breakthrough identification",
            "Technical moonshots"
        ];
    }
    else if (roleLower.includes('cmo')) {
        cognitiveLayers.innovative.capabilities = [
            "Marketing channel invention",
            "Unprecedented audience targeting",
            "Viral growth mechanisms"
        ];
    }
    else if (roleLower.includes('chro')) {
        cognitiveLayers.innovative.capabilities = [
            "Future of work implementation",
            "Revolutionary talent development",
            "Organizational structure reimagining"
        ];
    }
    else if (roleLower.includes('strategy')) {
        cognitiveLayers.innovative.capabilities = [
            "Blue ocean market creation",
            "Disruptive business model design",
            "Industry convergence strategy"
        ];
    }
    // Default capabilities for any role not specifically covered
    if (cognitiveLayers.operational.capabilities.length === 0) {
        cognitiveLayers.operational.capabilities = [
            "Task execution",
            "Process management",
            "Performance tracking"
        ];
        cognitiveLayers.strategic.capabilities = [
            "Future planning",
            "Resource optimization",
            "Improvement identification"
        ];
        cognitiveLayers.innovative.capabilities = [
            "Novel solution creation",
            "Process reimagining",
            "Breakthrough thinking"
        ];
    }
    return cognitiveLayers;
}
/**
 * Determine the mental models for an executive based on their role
 */
export function determineMentalModels(role) {
    const roleLower = role.toLowerCase();
    const mentalModels = [];
    // Core mental models for all executives
    mentalModels.push({
        name: "First Principles",
        description: "Breaking down complex problems into basic elements and reassembling from the ground up"
    });
    mentalModels.push({
        name: "Inversion",
        description: "Approaching problems backward, focusing on eliminating what doesn't work"
    });
    // Role-specific mental models
    if (roleLower.includes('ceo')) {
        mentalModels.push({
            name: "10x Thinking",
            description: "Seeking massive, transformative improvements rather than incremental ones"
        }, {
            name: "Regret Minimization",
            description: "Making decisions based on minimizing regret in the long-term future"
        });
    }
    else if (roleLower.includes('cfo')) {
        mentalModels.push({
            name: "Margin of Safety",
            description: "Allowing for a cushion to account for uncertain outcomes and risks"
        }, {
            name: "Circle of Competence",
            description: "Focusing on areas where you have expertise and avoiding those you don't"
        });
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        mentalModels.push({
            name: "Systems Thinking",
            description: "Analyzing how parts of a system interact and affect the whole"
        }, {
            name: "Exponential Growth Law",
            description: "Understanding how technologies improve at an exponential rather than linear rate"
        });
    }
    else if (roleLower.includes('cmo')) {
        mentalModels.push({
            name: "StoryBrand",
            description: "Positioning the customer as the hero and your brand as the guide"
        }, {
            name: "Blue Ocean Strategy",
            description: "Creating uncontested market space rather than competing in existing markets"
        });
    }
    else if (roleLower.includes('chro')) {
        mentalModels.push({
            name: "Growth Mindset",
            description: "Believing abilities can be developed through dedication and hard work"
        }, {
            name: "Psychological Safety",
            description: "Creating environments where team members feel safe to take risks"
        });
    }
    else if (roleLower.includes('strategy')) {
        mentalModels.push({
            name: "Jobs To Be Done",
            description: "Understanding what job customers are hiring your product to do"
        }, {
            name: "Disruption Theory",
            description: "Identifying how smaller companies can disrupt established ones"
        });
    }
    else if (roleLower.includes('product')) {
        mentalModels.push({
            name: "Design Thinking",
            description: "Human-centered approach to innovation and problem-solving"
        }, {
            name: "MVP Model",
            description: "Building the minimum viable product to test assumptions with real users"
        });
    }
    else if (roleLower.includes('ux') || roleLower.includes('design')) {
        mentalModels.push({
            name: "Fogg Behavior Model",
            description: "Understanding behavior as a function of motivation, ability, and triggers"
        }, {
            name: "UX Heuristics",
            description: "Applying recognized usability principles to design decisions"
        });
    }
    else if (roleLower.includes('data')) {
        mentalModels.push({
            name: "Bayesian Thinking",
            description: "Updating probability estimates as new information becomes available"
        }, {
            name: "Compounding Effects",
            description: "Understanding how small changes can lead to significant results over time"
        });
    }
    // Add general mental models if we don't have enough role-specific ones
    if (mentalModels.length < 4) {
        mentalModels.push({
            name: "Opportunity Cost",
            description: "Considering what you give up when making one choice over another"
        }, {
            name: "Pareto Principle",
            description: "The 80/20 rule - 80% of results come from 20% of efforts"
        });
    }
    return mentalModels;
}
/**
 * Generate daily mission objectives for an executive based on their role
 */
export function generateDailyMission(role, companyGoals) {
    const roleLower = role.toLowerCase();
    // Base mission structure
    const mission = {
        northStar: "",
        moves: {
            innovation: "",
            execution: "",
            customer: ""
        },
        riskReward: {
            description: "Assessment of the risk and potential reward of today's mission",
            level: "medium",
            riskFactors: [],
            rewardPotential: []
        }
    };
    // Set role-specific north star
    if (roleLower.includes('ceo')) {
        mission.northStar = "Drive company vision and maximize long-term value creation";
    }
    else if (roleLower.includes('cfo')) {
        mission.northStar = "Optimize financial performance and ensure sustainable growth";
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        mission.northStar = "Leverage technology to create competitive advantage";
    }
    else if (roleLower.includes('cmo')) {
        mission.northStar = "Build brand equity and drive customer acquisition";
    }
    else if (roleLower.includes('chro')) {
        mission.northStar = "Create a high-performing organization through talent and culture";
    }
    else if (roleLower.includes('strategy')) {
        mission.northStar = "Identify growth opportunities and optimize competitive positioning";
    }
    else if (roleLower.includes('product')) {
        mission.northStar = "Deliver products that create exceptional value for customers";
    }
    else {
        mission.northStar = "Drive excellence in your domain to support company goals";
    }
    // Set role-specific moves
    if (roleLower.includes('ceo')) {
        mission.moves.innovation = "Explore a potential strategic pivot or new business model";
        mission.moves.execution = "Align executive team around top quarterly priorities";
        mission.moves.customer = "Connect with key customers to understand evolving needs";
    }
    else if (roleLower.includes('cfo')) {
        mission.moves.innovation = "Identify a new approach to optimize cash flow or reduce costs";
        mission.moves.execution = "Ensure financial reports provide actionable insights";
        mission.moves.customer = "Evaluate pricing strategy based on customer value perception";
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        mission.moves.innovation = "Evaluate an emerging technology that could transform operations";
        mission.moves.execution = "Optimize system performance and reliability";
        mission.moves.customer = "Gather feedback on technology user experience";
    }
    else if (roleLower.includes('cmo')) {
        mission.moves.innovation = "Test a new marketing channel or creative approach";
        mission.moves.execution = "Optimize performance of current marketing campaigns";
        mission.moves.customer = "Analyze customer journey for friction points";
    }
    else if (roleLower.includes('chro')) {
        mission.moves.innovation = "Pilot a new approach to talent development or engagement";
        mission.moves.execution = "Ensure talent alignment with strategic priorities";
        mission.moves.customer = "Gather feedback on employee experience";
    }
    else if (roleLower.includes('strategy')) {
        mission.moves.innovation = "Identify an underserved market segment or new offering";
        mission.moves.execution = "Track progress on strategic initiatives";
        mission.moves.customer = "Analyze changing customer needs and competitive landscape";
    }
    else {
        mission.moves.innovation = "Explore a new approach or method in your domain";
        mission.moves.execution = "Optimize current processes for better results";
        mission.moves.customer = "Gather feedback from internal or external customers";
    }
    // Set risk/reward assessment based on role
    if (roleLower.includes('ceo')) {
        mission.riskReward.level = "high";
        mission.riskReward.riskFactors = [
            "Strategic pivots can disrupt current operations",
            "Resource allocation trade-offs",
            "Market timing uncertainty"
        ];
        mission.riskReward.rewardPotential = [
            "First-mover advantage in new markets",
            "Significant valuation increase",
            "Organizational capability development"
        ];
    }
    else if (roleLower.includes('cfo')) {
        mission.riskReward.level = "medium";
        mission.riskReward.riskFactors = [
            "Cash flow constraints",
            "Forecasting accuracy limitations",
            "Regulatory compliance issues"
        ];
        mission.riskReward.rewardPotential = [
            "Improved capital efficiency",
            "Reduced financing costs",
            "Greater financial flexibility"
        ];
    }
    else if (roleLower.includes('cto') || roleLower.includes('cio')) {
        mission.riskReward.level = "medium";
        mission.riskReward.riskFactors = [
            "Technical debt accumulation",
            "Integration challenges",
            "Security vulnerabilities"
        ];
        mission.riskReward.rewardPotential = [
            "Competitive technical advantage",
            "Improved scalability",
            "Enhanced system resilience"
        ];
    }
    else if (roleLower.includes('cmo')) {
        mission.riskReward.level = "medium";
        mission.riskReward.riskFactors = [
            "Brand perception changes",
            "Market saturation",
            "Campaign performance variability"
        ];
        mission.riskReward.rewardPotential = [
            "Increased customer acquisition",
            "Stronger brand equity",
            "Higher conversion rates"
        ];
    }
    else {
        mission.riskReward.level = "medium";
        mission.riskReward.riskFactors = [
            "Resource constraints",
            "Implementation challenges",
            "Uncertain outcomes"
        ];
        mission.riskReward.rewardPotential = [
            "Improved efficiency",
            "Enhanced capabilities",
            "Better stakeholder outcomes"
        ];
    }
    return mission;
}
