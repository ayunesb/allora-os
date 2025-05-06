import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
export function CopyButton({ text, onCopy, className = "", showText = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      if (onCopy) onCopy();
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast.error("Failed to copy to clipboard");
    }
  };
  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="sm"
      className={`h-8 px-2 ${className}`}
      disabled={isCopied}
    >
      {isCopied ? (
        <>
          <Check className="h-3.5 w-3.5 mr-1" />
          {showText && "Copied"}
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 mr-1" />
          {showText && "Copy"}
        </>
      )}
    </Button>
  );
}
export default CopyButton;
