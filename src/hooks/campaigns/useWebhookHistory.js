var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback, useEffect } from "react";
export function useWebhookHistory() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const refreshEvents = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            // Mock implementation - replace with actual API call
            // const response = await fetch('/api/webhooks/events');
            // const data = await response.json();
            // setEvents(data);
            setEvents([]);
        }
        catch (err) {
            setError("Failed to fetch webhook events");
            console.error("Error fetching webhook events:", err);
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    // Initial fetch
    useEffect(() => {
        refreshEvents();
    }, [refreshEvents]);
    return {
        events,
        isLoading,
        error,
        refreshEvents,
    };
}
