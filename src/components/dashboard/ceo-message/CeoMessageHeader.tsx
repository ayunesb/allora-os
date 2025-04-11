
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useCeoSelection } from "@/hooks/useCeoSelection";

export function CeoMessageHeader() {
  const { profile } = useAuth();
  const { selectedCeo } = useCeoSelection();
  const companyName = profile?.company || "Your Company";
  
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-12 w-12 border-2 border-primary/20">
        <AvatarImage 
          src="/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png" 
          alt={selectedCeo.name} 
        />
        <AvatarFallback className="bg-primary/10">
          {selectedCeo.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div>
        <h3 className="text-xl font-semibold mb-1 flex items-center">
          Message from Your Virtual CEO
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">AI Generated</span>
        </h3>
        <p className="text-sm text-muted-foreground">
          Personalized strategic guidance for {companyName} from {selectedCeo.name}, your AI Executive
        </p>
      </div>
    </div>
  );
}
