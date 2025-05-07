var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "@/utils/loggingService";
import { supabase } from "@/integrations/supabase/client";
/**
 * Run the LangChain agent with the provided query and context
 */
export function runLangChainAgent(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { query, context = {}, userId, companyId } = params;
        try {
            logger.info("Running LangChain agent", { query, userId, companyId });
            // Call the Supabase Edge Function that runs the agent
            const { data, error } = yield supabase.functions.invoke("langchain-agent", {
                body: {
                    query,
                    context: Object.assign(Object.assign({}, context), { userId,
                        companyId }),
                },
            });
            if (error) {
                logger.error("LangChain agent error", error);
                return {
                    result: "",
                    error: `Agent execution failed: ${error.message}`,
                };
            }
            logger.info("LangChain agent execution complete", {
                success: true,
                toolCallCount: ((_a = data.toolCalls) === null || _a === void 0 ? void 0 : _a.length) || 0,
            });
            return {
                result: data.result,
                toolCalls: data.toolCalls,
            };
        }
        catch (err) {
            logger.error("LangChain agent execution error", err);
            return {
                result: "",
                error: `Agent execution failed: ${err.message}`,
            };
        }
    });
}
/**
 * Execute a specific tool directly without running the full agent
 */
export function executeAgentTool(toolName, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger.info("Executing agent tool directly", { toolName, input });
            const { data, error } = yield supabase.functions.invoke("langchain-tool", {
                body: {
                    tool: toolName,
                    input,
                },
            });
            if (error) {
                logger.error("Tool execution error", error);
                throw new Error(`Tool execution failed: ${error.message}`);
            }
            return data.result;
        }
        catch (err) {
            logger.error("Tool execution error", err);
            throw new Error(`Tool execution failed: ${err.message}`);
        }
    });
}
