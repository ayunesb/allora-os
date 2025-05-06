import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { formatRoleTitle } from "@/utils/consultation";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
export default function InsightDetailsDialog({ insight, open, onOpenChange }) {
  const { getDetailedInsight } = useCompanyInsights();
  if (!insight) {
    return null;
  }
  const detailedInsight = getDetailedInsight(insight.id);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{insight.title}</DialogTitle>
          <DialogDescription>
            AI Executive Team Recommendation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Primary Executive */}
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={insight.primaryBot.avatar}
                alt={insight.primaryBot.name}
              />
              <AvatarFallback>{insight.primaryBot.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{insight.primaryBot.name}</h3>
                <Badge variant="outline">
                  {formatRoleTitle(insight.primaryBot.role)}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {`Primary contributor to this ${insight.type} recommendation`}
              </p>
            </div>
          </div>

          <Separator />

          {/* Executive Summary */}
          {detailedInsight?.executiveSummary && (
            <div>
              <h4 className="font-medium mb-2">Executive Summary</h4>
              <p className="text-sm">{detailedInsight.executiveSummary}</p>
            </div>
          )}

          {/* Key Points */}
          {detailedInsight?.keyPoints &&
            detailedInsight.keyPoints.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Key Points</h4>
                <ul className="space-y-2">
                  {detailedInsight.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500 shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Detailed Description */}
          <div>
            <h4 className="font-medium mb-2">Detailed Reasoning</h4>
            <p className="text-sm">
              {detailedInsight?.reasoning || insight.description}
            </p>
          </div>

          {/* Contributors */}
          {detailedInsight?.contributors &&
            detailedInsight.contributors.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Contributing Executives</h4>
                <div className="space-y-3">
                  {detailedInsight.contributors.map((contributor, index) => (
                    <ContributorItem key={index} contributor={contributor} />
                  ))}
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function ContributorItem({ contributor }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        {contributor.opinion === "positive" && (
          <Check className="h-4 w-4 text-green-500" />
        )}
        {contributor.opinion === "negative" && (
          <X className="h-4 w-4 text-red-500" />
        )}
        {contributor.opinion === "neutral" && (
          <Minus className="h-4 w-4 text-yellow-500" />
        )}
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-sm">{contributor.name}</span>
          <span className="text-xs text-muted-foreground">
            ({formatRoleTitle(contributor.role)})
          </span>
        </div>
        <p className="text-xs mt-0.5 text-muted-foreground">
          {contributor.contribution}
        </p>
      </div>
    </div>
  );
}
