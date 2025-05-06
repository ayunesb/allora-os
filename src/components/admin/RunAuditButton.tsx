import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlayIcon } from "lucide-react";
export function RunAuditButton() {
  const navigate = useNavigate();
  const handleRunAudit = () => {
    navigate("/admin/run-audit");
  };
  return (
    <Button onClick={handleRunAudit} className="gap-2" variant="outline">
      <PlayIcon className="h-4 w-4" />
      Run Full System Audit
    </Button>
  );
}
