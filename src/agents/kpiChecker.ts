
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

export async function checkActionOutcome(actionId: string, task: string) {
  logger.info(`Checking outcome for task: ${task}`);

  // Simulated KPI check (replace with real checks)
  const succeeded = Math.random() > 0.3; // 70% chance of success for now

  const outcome = succeeded ? 'success' : 'failure';
  const notes = succeeded
    ? 'Task completed successfully. Target achieved.'
    : 'Task failed. Metrics below target.';

  // Update action with outcome
  const { data, error } = await supabase
    .from('executive_actions')
    .update({
      outcome,
      performance_notes: notes,
    })
    .eq('id', actionId);

  if (error) {
    logger.error('Failed to update action outcome', { error });
    return { outcome: 'unknown', notes: 'Error updating outcome' };
  }

  // Update executive memory with outcome
  await updateExecutiveMemoryWithOutcome(task, outcome, notes);

  logger.info('Outcome updated successfully', { outcome, notes });
  return { outcome, notes };
}

async function updateExecutiveMemoryWithOutcome(task: string, outcome: string, notes: string) {
  const { data, error } = await supabase.from('executive_memory').insert([
    {
      user_id: await getCurrentUserId(),
      executive_name: 'System',
      task: `Outcome Analysis for: ${task}`,
      decision: `Result: ${outcome.toUpperCase()} - ${notes}`,
    },
  ]);

  if (error) {
    logger.error('Failed to update executive memory with outcome', { error });
  }
}

// Utility function to get current user ID
async function getCurrentUserId() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || 'unknown';
  } catch (error) {
    logger.error('Failed to get current user', { error });
    return 'unknown';
  }
}
