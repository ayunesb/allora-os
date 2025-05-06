import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function AuditLogFilters({
  actionFilter,
  setActionFilter,
  userFilter,
  setUserFilter,
  date,
  setDate,
  onExportLogs,
}) {
  const resetFilters = () => {
    setActionFilter("all");
    setUserFilter("");
    setDate(undefined);
  };
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  const [showFilters, setShowFilters] = useState(!isMobileView);
  // Only show filter toggle on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <div className="space-y-4">
      {isMobileView && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Button variant="outline" size="sm" onClick={onExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      )}

      {(showFilters || !isMobileView) && (
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
                <SelectItem value="DATA_MODIFICATION">
                  Data Modification
                </SelectItem>
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
                    !date && "text-muted-foreground",
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
            size={isMobileView ? "sm" : "default"}
            onClick={resetFilters}
          >
            Reset
          </Button>

          {!isMobileView && (
            <Button
              className="ml-auto"
              variant="outline"
              onClick={onExportLogs}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          )}
        </div>
      )}

      {/* Active filters indicator */}
      {(actionFilter !== "all" || userFilter || date) && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          {actionFilter !== "all" && (
            <span className="bg-muted px-2 py-1 rounded-md flex items-center">
              Action: {actionFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setActionFilter("all")}
              />
            </span>
          )}
          {userFilter && (
            <span className="bg-muted px-2 py-1 rounded-md flex items-center">
              User: {userFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setUserFilter("")}
              />
            </span>
          )}
          {date && (
            <span className="bg-muted px-2 py-1 rounded-md flex items-center">
              Date: {format(date, "PP")}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setDate(undefined)}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
