import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const kpis = [
    { label: "Leads Captured", value: 312 },
    { label: "Campaign ROI", value: "168%" },
    { label: "Monthly Revenue", value: "$8,400" },
    { label: "Conversion Rate", value: "12.5%" },
];
export default function KPIs() {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (<Card key={idx}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{kpi.value}</div>
          </CardContent>
        </Card>))}
    </div>);
}
