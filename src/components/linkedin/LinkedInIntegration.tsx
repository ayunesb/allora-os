import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLinkedInIntegration } from "@/hooks/useLinkedInIntegration";
import { Loader2, Search, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

type LinkedInIntegrationProps = {
  children: React.ReactNode;
  variant?: "default" | "minimal";
  size?: "small" | "medium";
};

export const LinkedInIntegration: React.FC<LinkedInIntegrationProps> = ({
  children,
  variant = "default",
  size = "medium",
}) => {
  const {
    connectToLinkedIn,
    searchConnections,
    importConnections,
    disconnect,
    isAuthenticated,
    isConnecting,
    isSearching,
    isImporting,
  } = useLinkedInIntegration();
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([]);
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  // Fetch campaigns
  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, name")
        .order("name", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    const results = await searchConnections(searchQuery);
    setConnections(results);
    setSelectedConnections([]);
  };
  const handleImport = async () => {
    if (!selectedCampaign) {
      toast.error("Please select a campaign");
      return;
    }
    if (selectedConnections.length === 0) {
      toast.error("Please select at least one connection to import");
      return;
    }
    const connectionsToImport = connections.filter((c) =>
      selectedConnections.includes(c.id),
    );
    await importConnections(connectionsToImport, selectedCampaign);
    // Clear selections after import
    setSelectedConnections([]);
  };
  const toggleConnectionSelection = (id) => {
    setSelectedConnections((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };
  const selectAllConnections = () => {
    if (selectedConnections.length === connections.length) {
      setSelectedConnections([]);
    } else {
      setSelectedConnections(connections.map((c) => c.id));
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Integration</CardTitle>
          <CardDescription>
            Connect to LinkedIn to import your connections as leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <p>
                Connect your LinkedIn account to import connections as leads
              </p>
              <Button onClick={connectToLinkedIn} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect to LinkedIn"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">Connected to LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    Search and import your connections
                  </p>
                </div>
                <Button variant="outline" onClick={disconnect}>
                  Disconnect
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search connections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    Search
                  </Button>
                </div>

                {connections.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllConnections}
                      >
                        {selectedConnections.length === connections.length
                          ? "Deselect All"
                          : "Select All"}
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        {selectedConnections.length} of {connections.length}{" "}
                        selected
                      </p>
                    </div>

                    <div className="border rounded-md">
                      {connections.map((connection) => (
                        <div
                          key={connection.id}
                          className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={selectedConnections.includes(
                              connection.id,
                            )}
                            onCheckedChange={() =>
                              toggleConnectionSelection(connection.id)
                            }
                          />
                          <div className="flex-1">
                            <p className="font-medium">{connection.name}</p>
                            {connection.title && connection.company && (
                              <p className="text-sm text-muted-foreground">
                                {connection.title} at {connection.company}
                              </p>
                            )}
                            {connection.email && (
                              <p className="text-sm text-muted-foreground">
                                {connection.email}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4">
                      <Select
                        value={selectedCampaign}
                        onValueChange={setSelectedCampaign}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.id}>
                              {campaign.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={handleImport}
                        disabled={
                          isImporting ||
                          selectedConnections.length === 0 ||
                          !selectedCampaign
                        }
                      >
                        {isImporting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Import Selected Connections
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
