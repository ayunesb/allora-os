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
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
export function useProtectedApi() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const makeRequest = (options) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { url, method = "GET", headers = {}, body, skipAuthCheck = false, quiet = false, } = options;
        setIsLoading(true);
        try {
            // Check if user is authenticated unless explicitly skipped
            if (!skipAuthCheck && (!auth.user || !auth.session)) {
                throw new Error("User not authenticated");
            }
            // Prepare request headers with authentication token if available
            const requestHeaders = Object.assign({ "Content-Type": "application/json" }, headers);
            // Add auth token if available
            if ((_a = auth.session) === null || _a === void 0 ? void 0 : _a.access_token) {
                requestHeaders["Authorization"] = `Bearer ${auth.session.access_token}`;
            }
            // Make the API request
            const response = yield fetch(url, {
                method,
                headers: requestHeaders,
                body: body ? JSON.stringify(body) : undefined,
            });
            if (!response.ok) {
                const errorData = yield response
                    .json()
                    .catch(() => ({ message: "Network response was not ok" }));
                throw new Error(errorData.message ||
                    `Error ${response.status}: ${response.statusText}`);
            }
            const data = yield response.json();
            setIsLoading(false);
            return data;
        }
        catch (error) {
            setIsLoading(false);
            if (!quiet) {
                toast.error("API request failed", {
                    description: error instanceof Error ? error.message : "Unknown error occurred",
                });
            }
            throw error;
        }
    });
    return { makeRequest, isLoading };
}
export default useProtectedApi;
