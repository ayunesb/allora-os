var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
export const useWebhookHistory = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    useEffect(() => {
        const fetchEvents = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                // Mock data for demo
                const webhookEvents = [
                    {
                        id: "1",
                        webhook_id: "wh_123",
                        event_type: "test_event",
                        webhookType: "zapier",
                        webhook_type: "zapier",
                        status: "success",
                        payload: { test: true },
                        created_at: new Date().toISOString(),
                        timestamp: new Date().toISOString(),
                        targetUrl: "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
                    },
                    {
                        id: "2",
                        webhook_id: "wh_456",
                        event_type: "campaign_created",
                        webhookType: "slack",
                        webhook_type: "slack",
                        status: "failed",
                        payload: { campaign: "Summer Sale" },
                        created_at: new Date().toISOString(),
                        timestamp: new Date().toISOString(),
                        targetUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
                    },
                ];
                setEvents(webhookEvents);
                setFilteredEvents(webhookEvents);
            }
            catch (err) {
                setError("Failed to load webhook history.");
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchEvents();
    }, []);
    useEffect(() => {
        let result = [...events];
        // Apply search filter
        if (searchTerm) {
            result = result.filter((event) => {
                var _a, _b, _c;
                return ((_a = event.targetUrl) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    ((_b = event.event_type) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    ((_c = event.webhookType) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchTerm.toLowerCase()));
            });
        }
        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter((event) => event.status === statusFilter);
        }
        // Apply type filter
        if (typeFilter !== "all") {
            result = result.filter((event) => event.webhookType === typeFilter);
        }
        setFilteredEvents(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, statusFilter, typeFilter, events]);
    // Calculate pagination
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    return {
        events,
        filteredEvents,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedEvents,
    };
};
