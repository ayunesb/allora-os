
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportCard from "./ReportCard";

interface Report {
  id: string;
  title: string;
  date: string;
  status: "completed" | "scheduled";
  type: string;
}

interface ReportsListProps {
  reports: Report[];
}

export default function ReportsList({ reports }: ReportsListProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredReports = activeTab === "all" 
    ? reports 
    : reports.filter(report => report.type === activeTab);
  
  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Reports</TabsTrigger>
        <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
        <TabsTrigger value="annual">Annual</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <p className="col-span-2 text-center text-muted-foreground py-4">
              No reports found for this category
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
