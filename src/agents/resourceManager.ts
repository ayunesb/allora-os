
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

export async function allocateResources(executiveName: string, outcome: string) {
  try {
    const { data, error } = await supabase
      .from("executives")
      .select("*")
      .eq("name", executiveName)
      .single();

    if (error || !data) {
      logger.error("Executive not found", { executiveName, error });
      return;
    }

    let points = data.resource_points || 100;

    if (outcome === "success") {
      points += 10; // Reward 10 points for success
    } else if (outcome === "failure") {
      points -= 15; // Deduct 15 points for failure
    }

    // Keep resource points within bounds
    points = Math.max(0, Math.min(points, 500)); // Between 0 and 500

    const { error: updateError } = await supabase
      .from("executives")
      .update({ resource_points: points })
      .eq("name", executiveName);

    if (updateError) {
      logger.error("Failed to update resource points", { executiveName, updateError });
    } else {
      logger.info(`${executiveName} now has ${points} Resource Points`);
    }
    
    // Track resource points history for forecasting
    await supabase
      .from("executive_resource_history")
      .insert({
        executive_id: data.id,
        resource_points: points
      })
      .then(({ error }) => {
        if (error) {
          logger.error("Failed to track resource history", { executiveName, error });
        }
      });
  } catch (err) {
    logger.error("Error in allocateResources", { error: err });
  }
}

export function adjustVoteWeight(points: number): number {
  if (points >= 400) return 3; // VIP Executive
  if (points >= 250) return 2; // Senior Executive
  return 1; // Regular Executive
}
