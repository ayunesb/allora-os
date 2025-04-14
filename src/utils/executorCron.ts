
import cron from 'node-cron';
import { runAutoExecutor } from '@/agents/autoExecutor';
import { logger } from '@/utils/loggingService';

export function initializeAutoExecutorCron() {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    logger.info('Running Auto Executor Cron Job');
    await runAutoExecutor();
  });

  logger.info('Auto Executor Cron Job Initialized');
}
