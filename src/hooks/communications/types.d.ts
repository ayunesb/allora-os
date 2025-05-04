export type CommunicationType = 'phone' | 'zoom' | 'whatsapp';
export type CommunicationStatus = 'scheduled' | 'completed' | 'missed' | 'cancelled';
export type CommunicationOutcome = 'follow_up' | 'opportunity' | 'closed_won' | 'closed_lost' | null;
export interface Communication {
    id: string;
    lead_id: string;
    type: CommunicationType;
    status: CommunicationStatus;
    scheduled_at: string | null;
    ended_at: string | null;
    notes: string | null;
    ai_summary: string | null;
    meeting_link: string | null;
    outcome: CommunicationOutcome;
    created_at: string;
    created_by: string | null;
    metadata: Record<string, any>;
    leads?: {
        name: string;
        email: string;
        phone: string;
        status: string;
    };
}
export interface ZoomMeetingData {
    topic: string;
    startTime: string;
    duration: number;
    timezone?: string;
    agenda?: string;
}
export interface CommunicationData {
    type: CommunicationType;
    status: CommunicationStatus;
    scheduledAt?: string;
    endedAt?: string;
    notes?: string;
    outcome?: CommunicationOutcome;
    updateLeadStatus?: boolean;
    leadStatus?: string;
    metadata?: Record<string, any>;
}
