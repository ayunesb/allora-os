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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { AlertCircle, Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useCompanyAPI } from "@/context/CompanyAPIContext";
import { useClearbitTool } from "@/utils/langchain/hooks/useClearbitTool";
export default function ClearbitIntegration() {
    const { setApiKey, hasApiKey } = useCompanyAPI();
    const [apiKey, setApiKeyInput] = useState("");
    const [testValue, setTestValue] = useState("");
    const [testResult, setTestResult] = useState(null);
    const [testError, setTestError] = useState(null);
    const [testLoading, setTestLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("company");
    const { lookupCompany, lookupPerson, isLoading } = useClearbitTool();
    const saveApiKey = () => {
        if (!apiKey.trim()) {
            toast.error("Please enter an API key");
            return;
        }
        setApiKey("clearbit", apiKey.trim());
        toast.success("Clearbit API key saved successfully");
    };
    const runTest = () => __awaiter(this, void 0, void 0, function* () {
        if (!testValue.trim()) {
            toast.error(`Please enter a ${activeTab === "company" ? "domain" : "email"} to test`);
            return;
        }
        setTestResult(null);
        setTestError(null);
        setTestLoading(true);
        try {
            let result;
            if (activeTab === "company") {
                result = yield lookupCompany(testValue);
            }
            else {
                result = yield lookupPerson(testValue);
            }
            if (typeof result === "string" &&
                (result.includes("not found") || result.includes("failed"))) {
                setTestError(result);
            }
            else {
                setTestResult(result);
            }
        }
        catch (err) {
            setTestError(err instanceof Error
                ? err.message
                : "An error occurred during the test");
        }
        finally {
            setTestLoading(false);
        }
    });
    return (_jsxs("div", { className: "container space-y-6 py-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(TypographyH1, { children: "Clearbit Integration" }), hasApiKey("clearbit") && (_jsxs("div", { className: "flex items-center text-green-600", children: [_jsx(CheckCircle2, { className: "h-5 w-5 mr-2" }), " Connected"] }))] }), _jsx(TypographyP, { children: "Connect Clearbit to enrich leads and companies with detailed information. This integration enables AI agents to look up company and person data." }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Clearbit API Configuration" }), _jsx(CardDescription, { children: "Enter your Clearbit API key to connect to the Clearbit Enrichment API." })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "clearbit-key", children: "Clearbit API Key" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { id: "clearbit-key", type: "password", placeholder: "sk_...", value: apiKey, onChange: (e) => setApiKeyInput(e.target.value) }), _jsx(Button, { onClick: saveApiKey, children: "Save" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "You can find your API key in the Clearbit dashboard." })] }) }) })] }), hasApiKey("clearbit") && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Test Clearbit Integration" }), _jsx(CardDescription, { children: "Test the connection by looking up a company or person." })] }), _jsxs(CardContent, { children: [_jsxs(Tabs, { defaultValue: "company", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "company", children: "Company Lookup" }), _jsx(TabsTrigger, { value: "person", children: "Person Lookup" })] }), _jsx(TabsContent, { value: "company", className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "test-domain", children: "Company Domain" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { id: "test-domain", placeholder: "example.com", value: testValue, onChange: (e) => setTestValue(e.target.value) }), _jsx(Button, { onClick: runTest, disabled: testLoading, children: testLoading ? "Testing..." : "Test" })] })] }) }), _jsx(TabsContent, { value: "person", className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "test-email", children: "Email Address" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { id: "test-email", placeholder: "person@example.com", value: testValue, onChange: (e) => setTestValue(e.target.value) }), _jsx(Button, { onClick: runTest, disabled: testLoading, children: testLoading ? "Testing..." : "Test" })] })] }) })] }), testError && (_jsxs("div", { className: "mt-4 p-4 bg-red-50 text-red-800 rounded-md flex items-start", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 flex-shrink-0 mt-0.5" }), _jsx("p", { children: testError })] })), testResult && (_jsxs("div", { className: "mt-4 p-4 bg-green-50 text-green-800 rounded-md", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Check, { className: "h-5 w-5 mr-2" }), _jsx("p", { className: "font-medium", children: "Lookup successful!" })] }), _jsx("div", { className: "space-y-2 mt-2", children: Object.entries(testResult).map(([key, value]) => (_jsxs("div", { children: [_jsxs("span", { className: "font-medium", children: [key, ": "] }), _jsx("span", { children: value ? String(value) : "N/A" })] }, key))) })] }))] })] }))] }));
}
