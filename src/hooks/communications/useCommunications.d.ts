import {
  Communication,
  ZoomMeetingData,
  CommunicationData,
  CommunicationStatus,
  CommunicationOutcome,
} from "./types";
export declare function useCommunications(): {
  communications: Communication[];
  upcomingCommunications: Communication[];
  pastCommunications: Communication[];
  isLoading: boolean;
  isLoadingMutation: boolean;
  error: Error;
  refetch: (
    options?: import("@tanstack/react-query").RefetchOptions,
  ) => Promise<
    import("@tanstack/react-query").QueryObserverResult<Communication[], Error>
  >;
  createZoomMeeting: (
    leadId: string,
    meetingData: ZoomMeetingData,
  ) => Promise<any>;
  logCommunication: (
    leadId: string,
    communicationData: CommunicationData,
  ) => Promise<any>;
  generateAISummary: (
    communicationId: string,
    transcriptText: string,
  ) => Promise<any>;
  updateCommunicationStatus: (
    id: string,
    status: CommunicationStatus,
    notes?: string,
    outcome?: CommunicationOutcome,
  ) => Promise<boolean>;
};
