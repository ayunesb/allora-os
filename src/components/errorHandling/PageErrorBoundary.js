import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
class ErrorBoundaryFallback extends Component {
    constructor(props) {
        super(props);
        this.resetErrorBoundary = () => {
            this.setState({
                hasError: false,
                error: null,
            });
        };
        this.state = {
            hasError: false,
            error: null,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error(`Error in ${this.props.pageName}:`, error);
        console.error("Component stack:", errorInfo.componentStack);
        // Here you could also send the error to a monitoring service like Sentry
    }
    render() {
        if (this.state.hasError) {
            return (_jsx(ErrorFallbackUI, { error: this.state.error, pageName: this.props.pageName, resetErrorBoundary: this.resetErrorBoundary }));
        }
        return this.props.children;
    }
}
// Separate the UI component to use hooks
function ErrorFallbackUI({ error, pageName, resetErrorBoundary }) {
    const navigate = useNavigate();
    return (_jsx("div", { className: "container mx-auto px-4 py-12 flex justify-center", children: _jsxs(Card, { className: "w-full max-w-lg", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-destructive" }), _jsxs(CardTitle, { children: ["Error in ", pageName] })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "We encountered an error while loading this page. Our team has been notified of the issue." }), _jsx("div", { className: "bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-40", children: error.message })] }), _jsxs(CardFooter, { className: "flex justify-end gap-2", children: [_jsxs(Button, { variant: "outline", onClick: () => navigate("/"), className: "flex items-center gap-1", children: [_jsx(Home, { className: "h-4 w-4" }), "Home"] }), _jsxs(Button, { onClick: resetErrorBoundary, className: "flex items-center gap-1", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Try Again"] })] })] }) }));
}
// Wrapper component with hooks
export function PageErrorBoundary({ children, pageName }) {
    return (_jsx(ErrorBoundaryFallback, { pageName: pageName, children: children }));
}
