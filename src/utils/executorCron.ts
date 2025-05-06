import { runAutoExecutor } from "@/agents/autoExecutor";
import { logger } from "@/utils/loggingService";

let executorInterval: number | null = null;

/**
 * Initializes the auto-executor cron job
 * Runs every 5 minutes to check for pending actions
 */
export function initializeAutoExecutorCron() {
  // Clear any existing interval
  if (executorInterval) {
    clearInterval(executorInterval);
  }

  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    logger.info("Initializing auto-executor cron job");

    // Set up the interval to run every 5 minutes
    executorInterval = window.setInterval(
      () => {
        runAutoExecutor().catch((error) => {
          logger.error("Error running auto executor:", error);
        });
      },
      5 * 60 * 1000,
    ); // 5 minutes

    // Also run immediately on startup
    runAutoExecutor().catch((error) => {
      logger.error("Error running initial auto executor:", error);
    });

    return () => {
      if (executorInterval) {
        clearInterval(executorInterval);
        executorInterval = null;
      }
    };
  }
}

/**
 * Manually triggers the auto-executor to run immediately
 */
export async function triggerExecutorManually() {
  logger.info("Manually triggering auto-executor");
  await runAutoExecutor();
}
