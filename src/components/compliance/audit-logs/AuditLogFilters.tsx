
import { useState } from "react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLogFiltersProps {
  actionFilter: string;
  setActionFilter: (value: string) => void;
  userFilter: string;
  setUserFilter: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onExportLogs: () => void;
}

export default function AuditLogFilters({
  actionFilter,
  setActionFilter,
  userFilter,
  setUserFilter,
  date,
  setDate,
  onExportLogs
}: AuditLogFiltersProps) {
  const resetFilters = () => {
    setActionFilter("all");
    setUserFilter("");
    setDate(undefined);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="space-y-2 w-full md:w-48">
        <label className="text-sm font-medium">Action Type</label>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            <SelectItem value="DATA_ACCESS">Data Access</SelectItem>
            <SelectItem value="DATA_MODIFICATION">Data Modification</SelectItem>
            <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
            <SelectItem value="SYSTEM_CHANGE">System Change</SelectItem>
            <SelectItem value="EXPORT">Export</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 w-full md:w-60">
        <label className="text-sm font-medium">User</label>
        <Input 
          placeholder="Search by user" 
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 w-full md:w-48">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button
        variant="outline"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
      
      <Button className="ml-auto" variant="outline" onClick={onExportLogs}>
        <Download className="mr-2 h-4 w-4" />
        Export Logs
      </Button>
    </div>
  );
}
