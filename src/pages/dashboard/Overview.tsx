import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* KPI Cards */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">7</CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Monthly Leads</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">318</CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>ROI %</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">147%</CardContent>
      </Card>

      {/* Chart + Activity */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">[📊 Chart coming soon]</CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✅ Approved "Mother's Day Promo"</li>
            <li>🔁 Refreshed Meta data sync</li>
            <li>📥 Imported leads from Zapier</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
