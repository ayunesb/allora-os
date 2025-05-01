
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { UnifiedWebhookEvent } from "@/types/unified-types";
import { EventDetailsModal } from "../history/EventDetailsModal";
import { formatDistanceToNow } from "date-fns";

export interface WebhookEventTableProps {
  events: UnifiedWebhookEvent[];
  onViewEvent: (event: UnifiedWebhookEvent) => void;
}

export function WebhookEventTable({ events, onViewEvent }: WebhookEventTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEvent = (event: UnifiedWebhookEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    onViewEvent(event);
  };

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "success":
        return "default";
      case "failed":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
    } catch (e) {
      return "Unknown time";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No webhook events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {event.event_type || event.eventType || "Unknown"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {event.webhook_type || event.webhookType || "custom"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(event.status)}>
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatTime(event.created_at || event.timestamp || "")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewEvent(event)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
