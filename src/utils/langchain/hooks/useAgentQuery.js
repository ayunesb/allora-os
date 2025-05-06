var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { runLangChainAgent, } from "../agent";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
export function useAgentQuery(options) {
    const [query, setQuery] = useState("");
    const [context, setContext] = useState({});
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ["agent-query", query, context],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                return { result: "" };
            }
            logger.info("Executing agent query", {
                query,
                contextKeys: Object.keys(context),
            });
            return yield runLangChainAgent({ query, context });
        }),
        enabled: options.enabled !== false && !!query,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        meta: {
            onSettled: (_data, error) => {
                if (error) {
                    toast.error("Agent query failed", { description: error.message });
                    if (options.onError)
                        options.onError(error);
                }
            },
        },
    });
    const executeQuery = (newQuery, newContext) => __awaiter(this, void 0, void 0, function* () {
        try {
            setQuery(newQuery);
            if (newContext) {
                setContext(newContext);
            }
            const result = yield refetch();
            if (result.data && !result.error && options.onSuccess) {
                options.onSuccess(result.data);
            }
            return result.data;
        }
        catch (err) {
            logger.error("Error executing agent query", err);
            toast.error("Failed to run agent query", { description: err.message });
            throw err;
        }
    });
    return {
        executeQuery,
        result: (data === null || data === void 0 ? void 0 : data.result) || "",
        toolCalls: (data === null || data === void 0 ? void 0 : data.toolCalls) || [],
        isLoading: isLoading || isFetching,
        error: error || (data === null || data === void 0 ? void 0 : data.error),
        setContext,
    };
}
