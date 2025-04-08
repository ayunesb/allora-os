
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotCard from "@/components/BotCard";
import ExecutiveRoster from "@/components/ExecutiveRoster";
import ConsultationHistory from "@/components/ConsultationHistory";
import { executiveBots } from "@/backend/executiveBots";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Brain, 
  History, 
  Bot, 
  Search,
  BadgeInfo
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";

// Helper function to format role titles
function formatRoleTitle(role: string): string {
  switch (role) {
    case 'ceo': return 'Chief Executive Officer';
    case 'cfo': return 'Chief Financial Officer';
    case 'cio': return 'Chief Information Officer';
    case 'cmo': return 'Chief Marketing Officer';
    case 'chro': return 'Chief HR Officer';
    case 'coo': return 'Chief Operations Officer';
    case 'strategy': return 'Strategy Consultant';
    case 'vp_global_operations': return 'VP of Global Operations';
    case 'vp_research_development': return 'VP of Research & Development';
    case 'sales_business_development': return 'Sales & Business Development';
    case 'operations_efficiency': return 'Operations Efficiency Expert';
    default: return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}

// Helper function to get bot specialty based on role
function getBotSpecialty(role: string): string {
  switch (role) {
    case 'ceo': return 'Leadership, Vision, Strategy';
    case 'cfo': return 'Finance, Investment, Risk Management';
    case 'cio': return 'Technology, Innovation, Digital Transformation';
    case 'cmo': return 'Marketing, Brand, Customer Experience';
    case 'chro': return 'HR, Talent, Culture';
    case 'coo': return 'Operations, Efficiency, Process Optimization';
    case 'strategy': return 'Business Strategy, Competitive Analysis';
    case 'vp_global_operations': return 'Global Operations, Supply Chain';
    case 'vp_research_development': return 'R&D, Innovation, Product Development';
    case 'sales_business_development': return 'Sales, Partnerships, Business Development';
    case 'operations_efficiency': return 'Process Optimization, Operational Efficiency';
    default: return 'Business Consulting';
  }
}

export default function AiBots() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bots");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Prepare all bots as array of objects
  const allBots = Object.entries(executiveBots).flatMap(([role, names]) => 
    names.map(name => ({
      name,
      role,
      title: formatRoleTitle(role),
      specialty: getBotSpecialty(role),
      avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png` // Path to avatar image
    }))
  );

  // Filter bots based on search query and role filter
  const filteredBots = allBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || bot.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Handle consulting a specific bot
  const handleConsult = (bot: any) => {
    navigate(`/dashboard/ai-bots/${encodeURIComponent(bot.name)}/${bot.role}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Executive Advisors</h1>
        <p className="text-muted-foreground mt-2">
          Consult with AI executives for expert business guidance and strategic advice.
        </p>
      </div>

      <Tabs defaultValue="bots" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="bots" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Executive Advisors</span>
          </TabsTrigger>
          <TabsTrigger value="roster" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Full Roster</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Consultation History</span>
          </TabsTrigger>
        </TabsList>

        {/* Bots Grid Tab */}
        <TabsContent value="bots">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advisors..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.keys(executiveBots).map(role => (
                  <SelectItem key={role} value={role}>
                    {formatRoleTitle(role)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredBots.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <BadgeInfo className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No advisors found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any executive advisors matching your search criteria. 
                  Try adjusting your filters or search query.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBots.map((bot) => (
                <BotCard 
                  key={`${bot.role}-${bot.name}`} 
                  bot={bot}
                  onConsult={() => handleConsult(bot)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Executive Roster Tab */}
        <TabsContent value="roster">
          <ExecutiveRoster />
        </TabsContent>

        {/* Consultation History Tab */}
        <TabsContent value="history">
          <ConsultationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
