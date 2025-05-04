import { useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
export function useZoomIntegration() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [integration, setIntegration] = useState(null);
    const checkConnection = async () => {
        try {
            const response = await fetchApi('/api/zoom/status', 'GET');
            if (response.integration) {
                setIntegration(response.integration);
                setIsConnected(response.connected);
            }
            return response;
        }
        catch (err) {
            setError(err.message || 'Failed to check Zoom connection status');
            return { connected: false };
        }
    };
    const initiateZoomConnection = async () => {
        setIsConnecting(true);
        setError(null);
        try {
            const response = await fetchApi('/api/zoom/authorize', 'POST', {
                redirectUri: `${window.location.origin}/zoom-callback`,
                state: Math.random().toString(36).substring(2)
            });
            return response.authUrl;
        }
        catch (err) {
            setError(err.message || 'Failed to connect to Zoom');
            throw err;
        }
        finally {
            setIsConnecting(false);
        }
    };
    const connectZoom = async () => {
        try {
            const authUrl = await initiateZoomConnection();
            window.location.href = authUrl;
        }
        catch (err) {
            setError(err.message || 'Failed to connect to Zoom');
            throw err;
        }
    };
    const handleCallback = async (code, state, redirectUri) => {
        setIsConnecting(true);
        setError(null);
        try {
            const response = await fetchApi('/api/zoom/callback', 'POST', {
                code,
                state,
                redirectUri
            });
            if (response.success) {
                setIsConnected(true);
                if (response.integration) {
                    setIntegration(response.integration);
                }
                return { success: true, data: response };
            }
            else {
                setError('Failed to connect Zoom account');
                return {
                    success: false,
                    error: {
                        message: 'Failed to connect Zoom account'
                    }
                };
            }
        }
        catch (err) {
            setError(err.message || 'An error occurred while connecting to Zoom');
            return {
                success: false,
                error: {
                    message: err.message || 'An error occurred while connecting to Zoom',
                    code: err.code
                }
            };
        }
        finally {
            setIsConnecting(false);
        }
    };
    const disconnectZoom = async () => {
        try {
            const response = await fetchApi('/api/zoom/disconnect', 'POST');
            if (response.success) {
                setIsConnected(false);
                setIntegration(null);
            }
            return response;
        }
        catch (err) {
            setError(err.message || 'Failed to disconnect Zoom');
            return { success: false };
        }
    };
    return {
        isConnecting,
        isConnected,
        error,
        integration,
        initiateZoomConnection,
        handleCallback,
        disconnectZoom,
        connectZoom,
        checkConnection
    };
}
