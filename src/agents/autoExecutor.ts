import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
import { checkActionOutcome } from './kpiChecker';

export interface ExecutiveAction {
  id: string;
  task: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  triggered_by: string;
  user_id?: string;
  executive_name?: string;
  executive_role?: string;
}

export async function runAutoExecutor() {
  logger.info('Starting Auto Executor');
  
  try {
    const { data, error } = await supabase
      .from('executive_actions')
      .select('*')
      .eq('status', 'pending');

    if (error) {
      logger.error('Failed to fetch pending actions', { error });
      return;
    }

    if (!data || data.length === 0) {
      logger.info('No pending actions to execute');
      return;
    }

    for (const action of data) {
      await executeAction(action);
    }
  } catch (err) {
    logger.error('Error in auto executor', { error: err });
  }
}

async function executeAction(action: ExecutiveAction) {
  logger.info(`Executing task: ${action.task}`, { actionId: action.id });

  try {
    // Update status to in_progress
    await supabase
      .from('executive_actions')
      .update({ 
        status: 'in_progress',
        result: `Started executing: ${action.task}`
      })
      .eq('id', action.id);

    // Simulate action execution (replace with real logic)
    const result = await simulateActionExecution(action.task);

    // Mark as completed
    await supabase
      .from('executive_actions')
      .update({ 
        status: 'completed', 
        result: result,
        completed_at: new Date().toISOString()
      })
      .eq('id', action.id);

    // Check action outcome and update memory
    const outcomeResult = await checkActionOutcome(action.id, action.task);

    // Update executive performance
    await updateExecutivePerformance(action.executive_name || 'System', outcomeResult.outcome);

    logger.info(`Task completed successfully: ${action.task}`);
  } catch (error) {
    logger.error(`Failed to execute task: ${action.task}`, { error });

    // Mark as failed
    await supabase
      .from('executive_actions')
      .update({ 
        status: 'failed', 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('id', action.id);
  }
}

// Placeholder for actual action execution logic
async function simulateActionExecution(task: string): Promise<string> {
  // Replace this with actual execution logic for different types of tasks
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate work
  return `Successfully processed task: ${task}`;
}

// Exportable function for manual triggering if needed
export async function triggerAutoExecution(task: string, triggeredBy: string = 'Manual', executiveName?: string, executiveRole?: string) {
  const { data, error } = await supabase.from('executive_actions').insert([{
    task,
    status: 'pending',
    triggered_by: triggeredBy,
    executive_name: executiveName,
    executive_role: executiveRole
  }]);

  if (error) {
    logger.error('Failed to trigger auto-execution', { error, task });
    throw error;
  }

  logger.info('Auto-execution triggered', { task });
  return data;
}

async function updateExecutivePerformance(executiveName: string, outcome: string) {
  try {
    const { data, error } = await supabase
      .from('executives')
      .select('*')
      .eq('name', executiveName)
      .single();

    if (error || !data) {
      logger.error('Executive not found:', error);
      return;
    }

    let successfulActions = data.successful_actions || 0;
    let failedActions = data.failed_actions || 0;

    if (outcome === 'success') successfulActions += 1;
    else if (outcome === 'failure') failedActions += 1;

    const totalActions = successfulActions + failedActions;
    const successRate = totalActions > 0 ? (successfulActions / totalActions) * 100 : 0;

    // Calculate star rating
    let starRating = 1;
    if (successRate >= 90) starRating = 5;
    else if (successRate >= 75) starRating = 4;
    else if (successRate >= 60) starRating = 3;
    else if (successRate >= 45) starRating = 2;
    else starRating = 1;

    // Check for promotion
    let newLevel = data.level;
    let promotions = data.promotions || 0;
    if (starRating >= 5 && totalActions >= 20) {
      if (data.level === 'Executive') {
        newLevel = 'Senior Executive';
        promotions += 1;
      } else if (data.level === 'Senior Executive') {
        newLevel = 'Vice President';
        promotions += 1;
      } else if (data.level === 'Vice President') {
        newLevel = 'Chief Officer';
        promotions += 1;
      }
    }

    await supabase
      .from('executives')
      .update({
        successful_actions: successfulActions,
        failed_actions: failedActions,
        star_rating: starRating,
        level: newLevel,
        promotions: promotions,
      })
      .eq('name', executiveName);

    logger.info(`${executiveName} updated: ⭐ ${starRating} Stars, Level: ${newLevel}`);
  } catch (error) {
    logger.error('Error updating executive performance:', error);
  }
}

export { executeAction, updateExecutivePerformance };
