
import { executiveBoosts } from './executiveOS';
import { logger } from '@/utils/loggingService';

/**
 * Get personalized enhancements for an executive
 */
export function getExecutiveEnhancements(botName: string) {
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
export function determinePersonalityTraits(name: string, role: string): string[] {
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
