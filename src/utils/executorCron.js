var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { runAutoExecutor } from "@/agents/autoExecutor";
import { logger } from "@/utils/loggingService";
let executorInterval = null;
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
        executorInterval = window.setInterval(() => {
            runAutoExecutor().catch((error) => {
                logger.error("Error running auto executor:", error);
            });
        }, 5 * 60 * 1000); // 5 minutes
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
export function triggerExecutorManually() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info("Manually triggering auto-executor");
        yield runAutoExecutor();
    });
}
