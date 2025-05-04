export interface LegalAcceptanceProps {
    isOpen: boolean;
    userId: string;
    onClose: () => void;
    onAccept: () => void;
}
export declare function LegalAcceptanceModal({ isOpen, userId, onClose, onAccept }: LegalAcceptanceProps): JSX.Element;
