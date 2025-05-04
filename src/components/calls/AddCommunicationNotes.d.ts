interface AddCommunicationNotesProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    communicationId: string;
    existingNotes?: string;
}
export default function AddCommunicationNotes({ open, onOpenChange, communicationId, existingNotes, }: AddCommunicationNotesProps): import("react").JSX.Element;
export {};
