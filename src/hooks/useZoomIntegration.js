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
import { fetchApi } from "@/utils/api/apiClient";
export function useZoomIntegration() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [integration, setIntegration] = useState(null);
    const checkConnection = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchApi("/api/zoom/status", "GET");
            if (response.integration) {
                setIntegration(response.integration);
                setIsConnected(response.connected);
            }
            return response;
        }
        catch (err) {
            setError(err.message || "Failed to check Zoom connection status");
            return { connected: false };
        }
    });
    const initiateZoomConnection = () => __awaiter(this, void 0, void 0, function* () {
        setIsConnecting(true);
        setError(null);
        try {
            const response = yield fetchApi("/api/zoom/authorize", "POST", {
                redirectUri: `${window.location.origin}/zoom-callback`,
                state: Math.random().toString(36).substring(2),
            });
            return response.authUrl;
        }
        catch (err) {
            setError(err.message || "Failed to connect to Zoom");
            throw err;
        }
        finally {
            setIsConnecting(false);
        }
    });
    const connectZoom = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const authUrl = yield initiateZoomConnection();
            window.location.href = authUrl;
        }
        catch (err) {
            setError(err.message || "Failed to connect to Zoom");
            throw err;
        }
    });
    const handleCallback = (code, state, redirectUri) => __awaiter(this, void 0, void 0, function* () {
        setIsConnecting(true);
        setError(null);
        try {
            const response = yield fetchApi("/api/zoom/callback", "POST", {
                code,
                state,
                redirectUri,
            });
            if (response.success) {
                setIsConnected(true);
                if (response.integration) {
                    setIntegration(response.integration);
                }
                return { success: true, data: response };
            }
            else {
                setError("Failed to connect Zoom account");
                return {
                    success: false,
                    error: {
                        message: "Failed to connect Zoom account",
                    },
                };
            }
        }
        catch (err) {
            setError(err.message || "An error occurred while connecting to Zoom");
            return {
                success: false,
                error: {
                    message: err.message || "An error occurred while connecting to Zoom",
                    code: err.code,
                },
            };
        }
        finally {
            setIsConnecting(false);
        }
    });
    const disconnectZoom = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchApi("/api/zoom/disconnect", "POST");
            if (response.success) {
                setIsConnected(false);
                setIntegration(null);
            }
            return response;
        }
        catch (err) {
            setError(err.message || "Failed to disconnect Zoom");
            return { success: false };
        }
    });
    return {
        isConnecting,
        isConnected,
        error,
        integration,
        initiateZoomConnection,
        handleCallback,
        disconnectZoom,
        connectZoom,
        checkConnection,
    };
}
