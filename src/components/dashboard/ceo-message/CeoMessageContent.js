import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useCeoSelection } from "@/hooks/useCeoSelection";
import { useCeoMessage } from "@/hooks/useCeoMessage";
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';
export function CeoMessageContent({ riskAppetite }) {
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const { selectedCeo } = useCeoSelection();
    const { message, isLoading } = useCeoMessage(riskAppetite, auth.profile?.industry || undefined, auth.profile?.company || undefined);
    const companyName = auth.profile?.company || "Your Company";
    if (isLoading) {
        return (<div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>);
    }
    return (<div className="space-y-4">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-base">
          {message.greeting} 
        </p>
        
        <p>
          {message.strategicOverview}
        </p>
        
        <div className="my-4 flex flex-wrap gap-2">
          {message.tags.map((tag, index) => (<Badge key={index} variant="outline" className="bg-background/50">
              {tag}
            </Badge>))}
        </div>
        
        <p>
          {message.actionSteps}
        </p>
        
        <p>
          {message.closingStatement}
        </p>
      </div>
      
      <div className="pt-4 border-t border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedCeo.name}</span>
            <span className="text-xs text-muted-foreground">Virtual CEO for {companyName}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString()} 
          </div>
        </div>
      </div>
    </div>);
}
