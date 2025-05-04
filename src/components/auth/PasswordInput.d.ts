import { UseFormReturn } from "react-hook-form";
interface PasswordInputProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    showStrengthMeter?: boolean;
    setShowTips?: (show: boolean) => void;
}
export default function PasswordInput({ form, name, label, showStrengthMeter, setShowTips }: PasswordInputProps): import("react").JSX.Element;
export {};
