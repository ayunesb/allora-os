import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function AuthLoadingState() {
    const [longLoading, setLongLoading] = useState(false);
    useEffect(() => {
        // If loading takes more than 5 seconds, show additional message
        const timer = setTimeout(() => {
            setLongLoading(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen p-4", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mb-4" }), _jsx("p", { className: "text-muted-foreground mb-2", children: "Loading your account information..." }), longLoading && (_jsxs("div", { className: "mt-6 text-center max-w-md", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "This is taking longer than expected. If the page doesn't load in a few seconds, try refreshing the page." }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => window.location.reload(), children: "Refresh Page" })] }))] }));
}
