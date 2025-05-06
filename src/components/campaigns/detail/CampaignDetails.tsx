import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function CampaignDetails({ campaign }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Ad Creative</h3>
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium">
              {campaign.creatives?.[0]?.title || "No title"}
            </h4>
            <p className="text-muted-foreground mt-1">
              {campaign.creatives?.[0]?.description || "No description"}
            </p>
          </div>
        </div>

        {campaign.platform_specific_id && (
          <div>
            <h3 className="font-medium mb-2">Platform Details</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Platform ID:</span>
                <span>{campaign.platform_specific_id}</span>

                <span className="text-muted-foreground">Status:</span>
                <span>{campaign.platform_status}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
