import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import StrategyImplementationTools from "@/components/strategy-implementation/StrategyImplementationTools";
export default function StrategyDetails() {
  const { id } = useParams();
  return (
    <PageErrorBoundary pageName="Strategy Details">
      <Helmet>
        <title>Strategy Details | Allora AI</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Strategy Details</h1>

        <Card>
          <CardContent className="pt-6">
            {id ? (
              <StrategyImplementationTools strategyId={id} />
            ) : (
              <p className="text-muted-foreground">Strategy not found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageErrorBoundary>
  );
}
