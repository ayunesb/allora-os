interface CopyButtonProps {
    text: string;
    onCopy?: () => void;
    className?: string;
    showText?: boolean;
}
export declare function CopyButton({ text, onCopy, className, showText }: CopyButtonProps): import("react").JSX.Element;
export default CopyButton;
