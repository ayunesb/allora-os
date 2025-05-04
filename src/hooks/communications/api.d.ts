import { Communication, ZoomMeetingData, CommunicationData, CommunicationStatus, CommunicationOutcome } from './types';
export declare function fetchCommunications(): Promise<Communication[]>;
export declare function createZoomMeeting(leadId: string, meetingData: ZoomMeetingData): Promise<any>;
export declare function logCommunication(leadId: string, communicationData: CommunicationData): Promise<any>;
export declare function generateAISummary(communicationId: string, transcriptText: string): Promise<any>;
export declare function updateCommunicationStatus(id: string, status: CommunicationStatus, notes?: string, outcome?: CommunicationOutcome): Promise<boolean>;
