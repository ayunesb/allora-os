
import { logger } from '@/utils/loggingService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { integrateExecutiveOS } from './executiveOS';
import { getExecutiveEnhancements, determinePersonalityTraits } from './executiveBoostService';
import { determineStrategicFocus } from './roleStrategies';

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
    const strategicFocus = determineStrategicFocus(botRole);
    
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
