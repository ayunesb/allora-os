import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthState } from '@/hooks/useAuthState';
import { fetchCommunications, createZoomMeeting as apiCreateZoomMeeting, logCommunication as apiLogCommunication, generateAISummary as apiGenerateAISummary, updateCommunicationStatus as apiUpdateCommunicationStatus } from './api';
import { getUpcomingCommunications, getPastCommunications } from './utils';
export function useCommunications() {
    const { user } = useAuthState();
    const queryClient = useQueryClient();
    const [isLoadingMutation, setIsLoadingMutation] = useState(false);
    // Fetch all communications
    const { data: communications = [], isLoading, error, refetch } = useQuery({
        queryKey: ['communications'],
        queryFn: fetchCommunications,
        enabled: !!user?.id
    });
    // Create a new Zoom meeting
    const createZoomMeeting = async (leadId, meetingData) => {
        setIsLoadingMutation(true);
        try {
            const result = await apiCreateZoomMeeting(leadId, meetingData);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    };
    // Log a WhatsApp or Phone communication
    const logCommunication = async (leadId, communicationData) => {
        setIsLoadingMutation(true);
        try {
            const result = await apiLogCommunication(leadId, communicationData);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    };
    // Generate AI summary for a communication
    const generateAISummary = async (communicationId, transcriptText) => {
        setIsLoadingMutation(true);
        try {
            const result = await apiGenerateAISummary(communicationId, transcriptText);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    };
    // Update communication status
    const updateCommunicationStatus = async (id, status, notes, outcome) => {
        setIsLoadingMutation(true);
        try {
            const result = await apiUpdateCommunicationStatus(id, status, notes, outcome);
            // Invalidate queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            return result;
        }
        finally {
            setIsLoadingMutation(false);
        }
    };
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
        updateCommunicationStatus
    };
}
