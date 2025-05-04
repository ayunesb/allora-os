import { Badge } from "@/components/ui/badge";
export default function ReportsList({ reports }) {
    return (<div className="rounded-md border">
      <div className="divide-y">
        {reports.map((report) => (<div key={report.id} className="flex flex-col md:flex-row justify-between p-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{report.title}</h3>
                <Badge variant={report.status === "completed" ? "default" : "outline"}>
                  {report.status === "completed" ? "Completed" : "Scheduled"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{report.type}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{report.date}</span>
              <button className="text-sm font-medium text-primary hover:underline">
                {report.status === "completed" ? "Download" : "View details"}
              </button>
            </div>
          </div>))}
      </div>
    </div>);
}
