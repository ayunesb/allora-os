import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, ChevronDown, ChevronUp, Copy, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import { WebhookEvent } from '@/types/fixed/Webhook';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CopyButton } from "@/components/CopyButton";

// Import pagination components correctly
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Import our compatibility layer functions
import { normalizeWebhookEvent } from "@/utils/compatibilityLayer";

interface WebhookHistoryContentProps {
  events: WebhookEvent[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const statusColors = {
  success: "green",
  failed: "red",
  pending: "amber",
}

function WebhookEventRow({ event }: { event: WebhookEvent }) {
  const { toast } = useToast()
  return (
    <TableRow key={event.id}>
      <TableCell className="font-medium">{event.id}</TableCell>
      <TableCell>{event.webhookType}</TableCell>
      <TableCell>{event.targetUrl}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`bg-${statusColors[event.status]}-100 text-${statusColors[event.status]}-500`}>
          {event.status}
        </Badge>
      </TableCell>
      <TableCell>{event.timestamp}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                toast({
                  title: "Not implemented",
                  description: "This feature is not implemented yet.",
                })
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem>View Payload</DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Webhook Payload</DialogTitle>
                    <DialogDescription>
                      Here is the payload that was sent to the webhook.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="payload" className="text-right">
                        Payload
                      </Label>
                      <Textarea
                        id="payload"
                        className="col-span-3"
                        value={JSON.stringify(event.payload, null, 2)}
                        readOnly
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyButton text={JSON.stringify(event.payload, null, 2)} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export function WebhookHistoryContent({
  events,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: WebhookHistoryContentProps) {
  const pageCount = Math.ceil(totalCount / pageSize)
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map(event => {
              const normalizedEvent = normalizeWebhookEvent(event);
              return (
                <WebhookEventRow 
                  key={normalizedEvent.id} 
                  event={normalizedEvent} 
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            />
            {page > 2 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {page > 3 && <PaginationEllipsis />}
            {Array.from({ length: Math.min(5, pageCount) })
              .map((_, i) => {
                const pageNumber = Math.max(1, page - 2) + i;
                if (pageNumber > pageCount) {
                  return null;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={() => onPageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            {pageCount - page > 2 && <PaginationEllipsis />}
            {pageCount - page > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(pageCount)}
                >
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationNext
              href="#"
              onClick={() => onPageChange(page + 1)}
              disabled={page === pageCount}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
