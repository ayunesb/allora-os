import { WebhookEvent, WebhookType } from '@/types/unified-types';
export declare const useWebhookHistory: () => {
    events: WebhookEvent[];
    filteredEvents: WebhookEvent[];
    isLoading: boolean;
    error: string;
    searchTerm: string;
    setSearchTerm: import("react").Dispatch<import("react").SetStateAction<string>>;
    statusFilter: "all" | "success" | "failed" | "pending";
    setStatusFilter: import("react").Dispatch<import("react").SetStateAction<"all" | "success" | "failed" | "pending">>;
    typeFilter: "all" | WebhookType;
    setTypeFilter: import("react").Dispatch<import("react").SetStateAction<"all" | WebhookType>>;
    currentPage: number;
    setCurrentPage: import("react").Dispatch<import("react").SetStateAction<number>>;
    totalPages: number;
    paginatedEvents: WebhookEvent[];
};
