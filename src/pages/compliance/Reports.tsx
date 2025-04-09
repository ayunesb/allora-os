
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";
import ReportsList from "@/components/compliance/reports/ReportsList";
import CertificationsList from "@/components/compliance/reports/CertificationsList";
import { complianceReports } from "@/components/compliance/reports/mockData";

export default function ComplianceReports() {
  return (
    <ComplianceLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">Compliance Reports</h2>
            <p className="text-muted-foreground">
              Review and download compliance reports and certifications
            </p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>
        
        <ReportsList reports={complianceReports} />
        <CertificationsList />
      </div>
    </ComplianceLayout>
  );
}
