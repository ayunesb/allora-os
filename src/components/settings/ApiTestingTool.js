var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";
export default function ApiTestingTool() {
    const [isTestingApi, setIsTestingApi] = useState(false);
    const [apiEndpoint, setApiEndpoint] = useState("");
    const [apiMethod, setApiMethod] = useState("GET");
    const [apiResponse, setApiResponse] = useState("");
    const [apiHeaders, setApiHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
    const [apiBody, setApiBody] = useState("{}");
    const handleApiTest = () => __awaiter(this, void 0, void 0, function* () {
        if (!apiEndpoint) {
            toast.error("API endpoint is required");
            return;
        }
        setIsTestingApi(true);
        setApiResponse("");
        try {
            // Prepare headers
            let headers = {};
            try {
                headers = JSON.parse(apiHeaders);
            }
            catch (e) {
                toast.error("Invalid JSON format in headers");
                return;
            }
            // Prepare body for POST, PUT, PATCH
            let bodyData = undefined;
            if (["POST", "PUT", "PATCH"].includes(apiMethod)) {
                try {
                    bodyData = JSON.parse(apiBody);
                }
                catch (e) {
                    toast.error("Invalid JSON format in request body");
                    return;
                }
            }
            // Make the request
            const response = yield fetch(apiEndpoint, {
                method: apiMethod,
                headers,
                body: bodyData ? JSON.stringify(bodyData) : undefined,
            });
            // Get response as text first
            const responseText = yield response.text();
            // Try to parse as JSON for pretty display
            try {
                const responseJson = JSON.parse(responseText);
                setApiResponse(JSON.stringify(responseJson, null, 2));
            }
            catch (e) {
                // If not valid JSON, show as text
                setApiResponse(responseText);
            }
            toast.success(`API request completed with status: ${response.status}`);
        }
        catch (error) {
            console.error("API test error:", error);
            setApiResponse(`Error: ${error.message}`);
            toast.error(`API request failed: ${error.message}`);
        }
        finally {
            setIsTestingApi(false);
        }
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "API Testing" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Test API endpoints and view responses." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "api-endpoint", children: "API Endpoint" }), _jsx(Input, { id: "api-endpoint", placeholder: "https://api.example.com/data", value: apiEndpoint, onChange: (e) => setApiEndpoint(e.target.value) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "api-method", children: "Method" }), _jsxs(Select, { value: apiMethod, onValueChange: setApiMethod, children: [_jsx(SelectTrigger, { id: "api-method", children: _jsx(SelectValue, { placeholder: "Select method" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "GET", children: "GET" }), _jsx(SelectItem, { value: "POST", children: "POST" }), _jsx(SelectItem, { value: "PUT", children: "PUT" }), _jsx(SelectItem, { value: "PATCH", children: "PATCH" }), _jsx(SelectItem, { value: "DELETE", children: "DELETE" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "api-headers", children: "Headers (JSON)" }), _jsx(Textarea, { id: "api-headers", placeholder: '{"Content-Type": "application/json"}', value: apiHeaders, onChange: (e) => setApiHeaders(e.target.value), rows: 3 })] }), ["POST", "PUT", "PATCH"].includes(apiMethod) && (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "api-body", children: "Request Body (JSON)" }), _jsx(Textarea, { id: "api-body", placeholder: '{"key": "value"}', value: apiBody, onChange: (e) => setApiBody(e.target.value), rows: 5 })] })), _jsxs(Button, { onClick: handleApiTest, disabled: isTestingApi || !apiEndpoint, children: [isTestingApi ? "Testing..." : "Test API", !isTestingApi && _jsx(Send, { className: "ml-2 h-4 w-4" })] }), apiResponse && (_jsxs("div", { className: "mt-4", children: [_jsx(Label, { htmlFor: "api-response", children: "Response" }), _jsx("div", { className: "mt-2 p-4 bg-secondary/20 rounded-md overflow-auto max-h-80", children: _jsx("pre", { id: "api-response", className: "text-sm whitespace-pre-wrap", children: apiResponse }) })] }))] })] }));
}
