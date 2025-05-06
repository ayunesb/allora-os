import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/exportUtils";
import { RefreshCw } from "lucide-react";
export function LogsPanel({ maxLogs = 100, showFilters = true, tenantId }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [actionType, setActionType] = useState("");
  const [result, setResult] = useState("");
  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("audit_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(maxLogs);
      // Apply filters
      if (tenantId) {
        query = query.eq("tenant_id", tenantId);
      }
      if (actionType) {
        query = query.eq("action", actionType);
      }
      if (result) {
        query = query.eq("result", result);
      }
      const { data, error } = await query;
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, [tenantId, actionType, result]);
  // Filter logs based on search input
  const filteredLogs = filter
    ? logs.filter((log) =>
        JSON.stringify(log).toLowerCase().includes(filter.toLowerCase()),
      )
    : logs;
  // Extract unique action types for filter dropdown
  const actionTypes = [...new Set(logs.map((log) => log.action))];
  const resultTypes = [
    ...new Set(logs.map((log) => log.result).filter(Boolean)),
  ];
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Activity Logs</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchLogs}
          disabled={isLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent>
        {showFilters && (
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <Input
              placeholder="Filter logs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="sm:max-w-[220px]"
            />

            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger className="sm:max-w-[180px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Actions</SelectItem>
                {actionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={result} onValueChange={setResult}>
              <SelectTrigger className="sm:max-w-[180px]">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Results</SelectItem>
                {resultTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {isLoading ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">Loading logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">No logs found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="p-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <span className="font-semibold">
                    {log.action} {log.resource && `- ${log.resource}`}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(log.timestamp)}
                  </span>
                </div>

                {log.result && (
                  <div
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
                      log.result === "success"
                        ? "bg-green-100 text-green-800"
                        : log.result === "error"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {log.result}
                  </div>
                )}

                {log.details && (
                  <pre className="mt-2 p-2 bg-muted text-xs overflow-auto rounded max-h-28">
                    {typeof log.details === "object"
                      ? JSON.stringify(log.details, null, 2)
                      : log.details}
                  </pre>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
