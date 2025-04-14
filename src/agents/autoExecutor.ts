
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
import { checkActionOutcome } from './kpiChecker';
import { allocateResources } from './resourceManager';
import { updateExecutivePerformance } from './performanceTracker';

// Define the missing ExecutiveAction interface
interface ExecutiveAction {
  id: string;
  task: string;
  status: 'pending' | 'completed' | 'failed';
  executive_name?: string;
  executive_role?: string;
  result?: string;
  outcome?: string;
  error?: string;
  completed_at?: string;
  performance_notes?: string;
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
    // Simulate action execution
    const result = await simulateActionExecution(action.task);

    // Check action outcome
    const outcomeResult = await checkActionOutcome(action.id, action.task);

    // Update executive performance
    await updateExecutivePerformance(
      action.executive_name || 'System', 
      outcomeResult.outcome
    );

    // Allocate or deduct resource points
    await allocateResources(
      action.executive_name || 'System', 
      outcomeResult.outcome
    );

    // Update action status
    await supabase
      .from('executive_actions')
      .update({ 
        status: 'completed', 
        result: result,
        completed_at: new Date().toISOString()
      })
      .eq('id', action.id);

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
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate work
  return `Successfully processed task: ${task}`;
}
