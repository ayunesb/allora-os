import { Strategy } from "@/models/strategy";
interface StrategyWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateStrategy: (strategy: Omit<Strategy, 'id' | 'created_at'>) => Promise<Strategy | null>;
}
export default function StrategyWizardModal({ isOpen, onClose, onCreateStrategy }: StrategyWizardModalProps): JSX.Element;
export {};
