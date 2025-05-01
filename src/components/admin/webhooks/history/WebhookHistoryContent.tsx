
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Search, AlertCircle, RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeWebhookEvent } from "@/utils/authCompatibility";
import { UnifiedWebhookEvent } from "@/types/unified-types";

interface WebhookHistoryContentProps {
  events: UnifiedWebhookEvent[];
  isLoading: boolean;
  onRefresh: () => void;
  onShowDetails: (event: UnifiedWebhookEvent) => void;
}

export function WebhookHistoryContent({
  events = [],
  isLoading = false,
  onRefresh,
  onShowDetails
}: WebhookHistoryContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<UnifiedWebhookEvent[]>(events);

  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = events.filter((event) => {
      const normalizedEvent = normalizeWebhookEvent(event);
      return (
        normalizedEvent.event_type.toLowerCase().includes(lowerCaseQuery) ||
        normalizedEvent.status.toLowerCase().includes(lowerCaseQuery) ||
        (normalizedEvent.url && normalizedEvent.url.toLowerCase().includes(lowerCaseQuery))
      );
    });
    setFilteredEvents(filtered);
  }, [events, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search already handled via the useEffect
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <Check className="mr-1 h-3 w-3" />
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search webhooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Button type="submit" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No webhook events found.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onRefresh}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => {
                  const normalizedEvent = normalizeWebhookEvent(event);
                  return (
                    <TableRow key={normalizedEvent.id}>
                      <TableCell className="font-medium">
                        {normalizedEvent.event_type}
                      </TableCell>
                      <TableCell>{getStatusBadge(normalizedEvent.status)}</TableCell>
                      <TableCell>
                        {new Date(normalizedEvent.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowDetails(normalizedEvent)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default WebhookHistoryContent;
