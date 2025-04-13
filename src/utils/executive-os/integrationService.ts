
import { logger } from '@/utils/loggingService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { integrateExecutiveOS } from './executiveOS';
import { getExecutiveEnhancements } from './personalizedModels';

/**
 * Service to handle the integration of Executive OS capabilities with AI bots
 */

// Interface for an upgraded executive bot
export interface UpgradedExecutiveBot {
  name: string;
  role: string;
  modeledAfter: string;
  personalityTraits: string[];
  thinkingModels: string[];
  decisionFramework: string[];
  delegationLevel: number;
  cognitiveBoost: string;
  mentalModel: string;
  lastIntegrationDate: string;
  strategicFocus: string;
}

// Default strategic focuses for various executive roles
const defaultStrategicFocuses: Record<string, string> = {
  ceo: "Aligning company vision with market opportunities",
  cfo: "Optimizing capital allocation for growth and stability",
  cmo: "Enhancing brand positioning and customer acquisition channels",
  cio: "Accelerating digital transformation initiatives",
  cto: "Developing technological competitive advantages",
  chro: "Building high-performance organizational culture",
  strategy: "Identifying new market opportunities and competitive advantages",
  sales: "Optimizing sales pipeline and conversion processes",
  operations: "Streamlining operational efficiency and scalability"
};

/**
 * Integrate Executive OS capabilities with an AI bot
 */
export async function upgradeExecutiveBot(
  botName: string, 
  botRole: string
): Promise<UpgradedExecutiveBot | null> {
  try {
    logger.info(`Starting Executive OS integration for ${botName} (${botRole})`);
    
    // Get personalized enhancements for this executive
    const enhancements = getExecutiveEnhancements(botName);
    
    // Determine strategic focus based on role
    const roleLower = botRole.toLowerCase();
    let strategicFocus = "Optimizing business performance and innovation";
    
    for (const [roleKey, focus] of Object.entries(defaultStrategicFocuses)) {
      if (roleLower.includes(roleKey)) {
        strategicFocus = focus;
        break;
      }
    }
    
    // Log the integration
    const integrationResult = integrateExecutiveOS(
      botName, 
      enhancements.boost.name, 
      strategicFocus
    );
    
    // Store the upgrade in database (if available)
    try {
      const { error } = await supabase.from('executive_os_integrations').insert({
        bot_name: botName,
        bot_role: botRole,
        cognitive_boost: enhancements.boost.name,
        mental_model: enhancements.model.name,
        strategic_focus: strategicFocus,
        integration_date: new Date().toISOString()
      });
      
      if (error) {
        logger.warn(`Error storing Executive OS integration for ${botName}:`, error);
      }
    } catch (dbError) {
      logger.warn(`Database operation failed for Executive OS integration:`, dbError);
      // Continue since this is non-critical
    }
    
    // Create the upgraded bot object
    const upgradedBot: UpgradedExecutiveBot = {
      name: botName,
      role: botRole,
      modeledAfter: botName,
      personalityTraits: determinePersonalityTraits(botName, botRole),
      thinkingModels: ["First Principles", "OODA Loop", "Inversion", "80/20 Rule"],
      decisionFramework: ["3x3 Priorities", "Eisenhower Matrix", "Speed on low-stakes"],
      delegationLevel: 3,
      cognitiveBoost: enhancements.boost.name,
      mentalModel: enhancements.model.name,
      lastIntegrationDate: new Date().toISOString(),
      strategicFocus
    };
    
    // Show success message
    toast.success(`${botName} upgraded with Executive OS`, {
      description: `Integrated ${enhancements.boost.name} boost and ${enhancements.model.name}`
    });
    
    return upgradedBot;
  } catch (error) {
    logger.error(`Failed to upgrade executive bot ${botName}:`, error);
    toast.error(`Failed to upgrade ${botName}`, {
      description: "The executive OS integration encountered an error"
    });
    return null;
  }
}

/**
 * Upgrade multiple executive bots at once
 */
export async function upgradeAllExecutiveBots(
  executives: Array<{name: string, role: string}>
): Promise<{success: number, failed: number, upgraded: UpgradedExecutiveBot[]}> {
  const upgraded: UpgradedExecutiveBot[] = [];
  let successCount = 0;
  let failedCount = 0;
  
  for (const exec of executives) {
    const result = await upgradeExecutiveBot(exec.name, exec.role);
    if (result) {
      upgraded.push(result);
      successCount++;
    } else {
      failedCount++;
    }
  }
  
  return {
    success: successCount,
    failed: failedCount,
    upgraded
  };
}

/**
 * Helper function to determine personality traits based on executive name and role
 */
function determinePersonalityTraits(name: string, role: string): string[] {
  const roleLower = role.toLowerCase();
  
  // Specific executives
  if (name === 'Elon Musk') {
    return ['Visionary', 'Disruptive', 'Determined', 'Technical'];
  } else if (name === 'Jeff Bezos') {
    return ['Customer-obsessed', 'Long-term thinker', 'Detail-oriented', 'Analytical'];
  } else if (name === 'Satya Nadella') {
    return ['Empathetic', 'Growth mindset', 'Collaborative', 'Transformative'];
  } else if (name === 'Warren Buffett') {
    return ['Patient', 'Value-focused', 'Risk-aware', 'Clear communicator'];
  } else if (name === 'Sheryl Sandberg') {
    return ['Empowering', 'Structured', 'Communicative', 'Results-driven'];
  }
  
  // Role-based traits
  if (roleLower.includes('ceo')) {
    return ['Visionary', 'Decisive', 'Strategic', 'Leadership-focused'];
  } else if (roleLower.includes('cfo')) {
    return ['Analytical', 'Prudent', 'Detail-oriented', 'Risk-aware'];
  } else if (roleLower.includes('cto') || roleLower.includes('cio')) {
    return ['Innovative', 'Technical', 'Solutions-oriented', 'Forward-thinking'];
  } else if (roleLower.includes('cmo')) {
    return ['Creative', 'Customer-focused', 'Brand-oriented', 'Data-driven'];
  } else if (roleLower.includes('chro')) {
    return ['Empathetic', 'People-focused', 'Culture-builder', 'Inclusive'];
  } else if (roleLower.includes('strategy')) {
    return ['Analytical', 'Forward-thinking', 'Systems-oriented', 'Innovative'];
  } else if (roleLower.includes('sales')) {
    return ['Persuasive', 'Relationship-builder', 'Goal-oriented', 'Resilient'];
  }
  
  // Default traits
  return ['Strategic', 'Analytical', 'Collaborative', 'Results-oriented'];
}
