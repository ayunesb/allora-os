export default function AlertMessage({ title, description, variant, }: {
    title?: string;
    description: string;
    variant?: "default" | "destructive" | "warning" | "info";
}): import("react").JSX.Element;
