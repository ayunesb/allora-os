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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "@/hooks/useAuthState";
import { fetchCommunications, createZoomMeeting as apiCreateZoomMeeting, logCommunication as apiLogCommunication, generateAISummary as apiGenerateAISummary, updateCommunicationStatus as apiUpdateCommunicationStatus, } from "./api";
import { getUpcomingCommunications, getPastCommunications } from "./utils";
export function useCommunications() {
    const { user } = useAuthState();
    const queryClient = useQueryClient();
    const [isLoadingMutation, setIsLoadingMutation] = useState(false);
    // Fetch all communications
    const { data: communications = [], isLoading, error, refetch, } = useQuery({
        queryKey: ["communications"],
        queryFn: fetchCommunications,
        enabled: !!(user === null || user === void 0 ? void 0 : user.id),
    });
    // Create a new Zoom meeting
    const createZoomMeeting = (leadId, meetingData) => __awaiter(this, void 0, void 0, function* () {
        setIsLoadingMutation(true);
        try {
            const result = yield apiCreateZoomMeeting(leadId, meetingData);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ["communications"] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    });
    // Log a WhatsApp or Phone communication
    const logCommunication = (leadId, communicationData) => __awaiter(this, void 0, void 0, function* () {
        setIsLoadingMutation(true);
        try {
            const result = yield apiLogCommunication(leadId, communicationData);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ["communications"] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    });
    // Generate AI summary for a communication
    const generateAISummary = (communicationId, transcriptText) => __awaiter(this, void 0, void 0, function* () {
        setIsLoadingMutation(true);
        try {
            const result = yield apiGenerateAISummary(communicationId, transcriptText);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ["communications"] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    });
    // Update communication status
    const updateCommunicationStatus = (id, status, notes, outcome) => __awaiter(this, void 0, void 0, function* () {
        setIsLoadingMutation(true);
        try {
            const result = yield apiUpdateCommunicationStatus(id, status, notes, outcome);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ["communications"] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    });
    return {
        communications,
        upcomingCommunications: getUpcomingCommunications(communications),
        pastCommunications: getPastCommunications(communications),
        isLoading,
        isLoadingMutation,
        error,
        refetch,
        createZoomMeeting,
        logCommunication,
        generateAISummary,
        updateCommunicationStatus,
    };
}
