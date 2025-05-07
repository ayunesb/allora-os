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
import { toast } from "@/components/ui/use-toast";
export function useExternalLangChainAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const executeQuery = (params) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const apiEndpoint = localStorage.getItem("langchain_api_endpoint");
            if (!apiEndpoint) {
                throw new Error("LangChain API endpoint not configured. Please set up the API endpoint in the settings.");
            }
            const response = yield fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: params.query,
                    context: params.context || {},
                }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`API error (${response.status}): ${errorText}`);
            }
            const data = yield response.json();
            if (!data.result) {
                throw new Error("API response missing result data");
            }
            setResult(data.result);
            return { result: data.result };
        }
        catch (err) {
            const errorMessage = err.message || "An unknown error occurred";
            setError(errorMessage);
            const toastConfig = {
                title: "Error",
                description: "API failure",
                variant: "destructive", // Use proper typing
                children: "Error details", // Added missing 'children' property
            };
            toast(toastConfig);
            return { result: "", error: errorMessage };
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        executeQuery,
        isLoading,
        result,
        error,
        clearResult: () => setResult(null),
        clearError: () => setError(null),
    };
}
