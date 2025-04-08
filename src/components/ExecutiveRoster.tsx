
import { useState } from "react";
import { executiveBots } from "@/backend/executiveBots";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  RocketIcon, 
  Sparkles, 
  Brain, 
  DollarSign, 
  Activity, 
  Users
} from "lucide-react";

export default function ExecutiveRoster() {
  const [activeRole, setActiveRole] = useState<string>("ceo");
  
  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'ceo':
        return <RocketIcon className="h-5 w-5" />;
      case 'cfo':
        return <DollarSign className="h-5 w-5" />;
      case 'cio':
        return <Brain className="h-5 w-5" />;
      case 'cmo':
        return <Activity className="h-5 w-5" />;
      case 'chro':
        return <Users className="h-5 w-5" />;
      case 'strategy':
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };
  
  const getRoleTitle = (role: string) => {
    switch(role) {
      case 'ceo':
        return "Chief Executive Officers";
      case 'cfo':
        return "Chief Financial Officers";
      case 'cio':
        return "Chief Information Officers";
      case 'cmo':
        return "Chief Marketing Officers";
      case 'chro':
        return "Chief HR Officers";
      case 'strategy':
        return "Strategy Consultants";
      default:
        return "Executives";
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Full Executive Roster</h2>
      
      <Tabs defaultValue="ceo" onValueChange={setActiveRole}>
        <TabsList className="mb-4">
          {Object.keys(executiveBots).map(role => (
            <TabsTrigger key={role} value={role} className="flex items-center gap-2">
              {getRoleIcon(role)}
              <span className="capitalize">{role}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(executiveBots).map(([role, names]) => (
          <TabsContent key={role} value={role}>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                {getRoleIcon(role)}
                <h3 className="text-lg font-medium">{getRoleTitle(role)}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {names.map(name => (
                  <div key={name} className="bg-background border border-border/50 rounded-md p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      {name.split(' ')[0][0]}
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
