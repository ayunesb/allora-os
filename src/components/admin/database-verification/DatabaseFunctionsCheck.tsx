import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Code } from "lucide-react";
export function DatabaseFunctionsCheck({ functions }) {
  if (!functions || functions.length === 0) return null;
  // Count function issues
  const functionIssues = functions.filter(
    (f) => !f.exists || !f.isSecure,
  ).length;
  return (
    <div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-purple-500" />
          <span>Database Functions</span>
        </div>
        {functionIssues > 0 ? (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            {functionIssues} issues
          </span>
        ) : (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            All configured
          </span>
        )}
      </div>
      <div className="divide-y divide-border/60">
        {functions.map((func) => (
          <div key={func.name} className="px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {func.exists ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">{func.name}</span>
              </div>
              <span
                className={`text-sm ${func.exists ? "text-green-600" : "text-red-600"}`}
              >
                {func.exists ? "Exists" : "Missing"}
              </span>
            </div>

            {func.exists && (
              <div className="flex items-center pl-7 mt-1">
                <div className="flex items-center gap-2">
                  {func.isSecure ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {func.isSecure
                      ? "SECURITY DEFINER"
                      : "Not using SECURITY DEFINER"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
