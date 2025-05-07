var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLinkedInIntegration } from "@/hooks/useLinkedInIntegration";
import { Loader2, Search, UserPlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
export const LinkedInIntegration = ({ children, variant = "default", size = "medium", }) => {
    const { connectToLinkedIn, searchConnections, importConnections, disconnect, isAuthenticated, isConnecting, isSearching, isImporting, } = useLinkedInIntegration();
    const [searchQuery, setSearchQuery] = useState("");
    const [connections, setConnections] = useState([]);
    const [selectedConnections, setSelectedConnections] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    // Fetch campaigns
    const { data: campaigns = [] } = useQuery({
        queryKey: ["campaigns"],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("campaigns")
                .select("id, name")
                .order("name", { ascending: true });
            if (error)
                throw error;
            return data || [];
        }),
    });
    const handleSearch = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!searchQuery.trim()) {
            toast.error("Please enter a search term");
            return;
        }
        const results = yield searchConnections(searchQuery);
        setConnections(results);
        setSelectedConnections([]);
    });
    const handleImport = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedCampaign) {
            toast.error("Please select a campaign");
            return;
        }
        if (selectedConnections.length === 0) {
            toast.error("Please select at least one connection to import");
            return;
        }
        const connectionsToImport = connections.filter((c) => selectedConnections.includes(c.id));
        yield importConnections(connectionsToImport, selectedCampaign);
        // Clear selections after import
        setSelectedConnections([]);
    });
    const toggleConnectionSelection = (id) => {
        setSelectedConnections((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
    };
    const selectAllConnections = () => {
        if (selectedConnections.length === connections.length) {
            setSelectedConnections([]);
        }
        else {
            setSelectedConnections(connections.map((c) => c.id));
        }
    };
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "LinkedIn Integration" }), _jsx(CardDescription, { children: "Connect to LinkedIn to import your connections as leads" })] }), _jsx(CardContent, { children: !isAuthenticated ? (_jsxs("div", { className: "flex flex-col items-center gap-4 py-6", children: [_jsx("p", { children: "Connect your LinkedIn account to import connections as leads" }), _jsx(Button, { onClick: connectToLinkedIn, disabled: isConnecting, children: isConnecting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Connecting..."] })) : ("Connect to LinkedIn") })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: "Connected to LinkedIn" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Search and import your connections" })] }), _jsx(Button, { variant: "outline", onClick: disconnect, children: "Disconnect" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Search connections...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "flex-1" }), _jsxs(Button, { onClick: handleSearch, disabled: isSearching, children: [isSearching ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(Search, { className: "h-4 w-4 mr-2" })), "Search"] })] }), connections.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: selectAllConnections, children: selectedConnections.length === connections.length
                                                            ? "Deselect All"
                                                            : "Select All" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [selectedConnections.length, " of ", connections.length, " ", "selected"] })] }), _jsx("div", { className: "border rounded-md", children: connections.map((connection) => (_jsxs("div", { className: "flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50", children: [_jsx(Checkbox, { checked: selectedConnections.includes(connection.id), onCheckedChange: () => toggleConnectionSelection(connection.id) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium", children: connection.name }), connection.title && connection.company && (_jsxs("p", { className: "text-sm text-muted-foreground", children: [connection.title, " at ", connection.company] })), connection.email && (_jsx("p", { className: "text-sm text-muted-foreground", children: connection.email }))] })] }, connection.id))) }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Select, { value: selectedCampaign, onValueChange: setSelectedCampaign, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a campaign" }) }), _jsx(SelectContent, { children: campaigns.map((campaign) => (_jsx(SelectItem, { value: campaign.id, children: campaign.name }, campaign.id))) })] }), _jsx(Button, { onClick: handleImport, disabled: isImporting ||
                                                            selectedConnections.length === 0 ||
                                                            !selectedCampaign, children: isImporting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Importing..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Import Selected Connections"] })) })] })] }))] })] })) })] }) }));
};
