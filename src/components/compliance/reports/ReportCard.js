import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, CheckCircle2 } from "lucide-react";
export default function ReportCard({ report }) {
    return (<Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{report.title}</CardTitle>
          {report.status === "completed" ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<Calendar className="h-5 w-5 text-blue-500"/>)}
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(report.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Status: </span>
            <span className={`text-sm ${report.status === "completed"
            ? "text-green-500"
            : "text-blue-500"}`}>
              {report.status === "completed" ? "Completed" : "Scheduled"}
            </span>
          </div>
          
          {report.status === "completed" ? (<Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4"/>
              Download
            </Button>) : (<Button size="sm" variant="outline" disabled>
              Pending
            </Button>)}
        </div>
      </CardContent>
    </Card>);
}
