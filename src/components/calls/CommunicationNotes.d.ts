import { Communication } from "@/hooks/useCommunications";
type CommunicationNotesProps = {
    communications: Communication[];
    isLoading: boolean;
    onClose?: () => void;
};
type CommunicationNotesWithIdProps = CommunicationNotesProps & {
    communicationId?: string;
};
export default function CommunicationNotes({ communications, isLoading, onClose, communicationId }: CommunicationNotesWithIdProps): JSX.Element;
export {};
