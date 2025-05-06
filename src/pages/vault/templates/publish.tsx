import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/api/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import AdminOnly from "@/components/AdminOnly";
import { Badge } from "@/components/ui/badge";
export default function PublishStrategyTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishingId, setPublishingId] = useState(null);
  const loadTemplates = async () => {
    setLoading(true);
    try {
      const data = await fetchApi("/api/vault/templates/drafts");
      setTemplates(data || []);
    } catch (error) {
      console.error("Error loading templates:", error);
      toast.error("Failed to load strategy templates");
    } finally {
      setLoading(false);
    }
  };
  const handlePublish = async (id) => {
    setPublishingId(id);
    try {
      await fetchApi(`/api/vault/templates/publish?id=${id}`, {
        method: "POST",
      });
      toast.success("Strategy template published successfully");
      loadTemplates();
    } catch (error) {
      console.error("Error publishing template:", error);
      toast.error("Failed to publish strategy template");
    } finally {
      setPublishingId(null);
    }
  };
  useEffect(() => {
    loadTemplates();
  }, []);
  return (
    <AdminOnly>
      <div className="container py-8">
        <DashboardBreadcrumb />

        <div className="flex items-center justify-between gap-2 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              🚀 Publish Strategy Templates
            </h1>
            <p className="text-muted-foreground">
              Review and publish tenant-created strategies to the public Vault.
            </p>
          </div>

          <Button onClick={loadTemplates} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-6 w-1/3 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-full bg-muted rounded-sm mb-2"></div>
                  <div className="h-4 w-2/3 bg-muted rounded-sm"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : templates.length > 0 ? (
          <ul className="space-y-4">
            {templates.map((tpl) => (
              <Card
                key={tpl.id}
                className={`border ${tpl.is_public ? "border-green-500/30" : "border-border"}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-semibold text-lg">{tpl.title}</h2>
                        {tpl.is_public && (
                          <Badge variant="success" className="text-xs">
                            Published
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tpl.industry}
                      </p>
                      <p className="mt-2">{tpl.summary}</p>
                    </div>
                    <div className="ml-4">
                      <p className="text-xs text-muted-foreground text-right mb-2">
                        Created: {new Date(tpl.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground text-right">
                        Used by {tpl.used_by || 0} teams
                      </p>
                      {!tpl.is_public && (
                        <Button
                          className="mt-2 w-full"
                          size="sm"
                          onClick={() => handlePublish(tpl.id)}
                          disabled={publishingId === tpl.id}
                        >
                          {publishingId === tpl.id
                            ? "Publishing..."
                            : "📢 Publish"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No strategy templates found to review
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminOnly>
  );
}
