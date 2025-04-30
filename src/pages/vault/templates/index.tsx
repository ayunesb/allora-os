
import { useEffect, useState } from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { File } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface StrategyTemplate {
  id: string;
  title: string;
  summary: string;
  industry: string;
  used_by: number;
}

export default function VaultTemplatesPage() {
  const [templates, setTemplates] = useState<StrategyTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    
    async function fetchTemplates() {
      try {
        const { data, error } = await supabase.functions.invoke('strategy-templates');
        
        if (error) {
          console.error('Error loading strategy templates:', error);
          setTemplates([]);
        } else {
          setTemplates(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch strategy templates:', err);
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTemplates();
  }, []);

  const industries = [...new Set(templates.map(t => t.industry))];
  
  const filteredTemplates = selectedIndustry 
    ? templates.filter(t => t.industry === selectedIndustry)
    : templates;
    
  const handleRemix = async (templateId: string, templateTitle: string) => {
    try {
      const tenant_id = user?.tenant_id || user?.id; // Fallback to user id if tenant_id is not available
      
      if (!tenant_id) {
        toast.error("You must be logged in to remix templates");
        return;
      }
      
      toast.info(`Starting remix of "${templateTitle}"...`);
      
      const { data, error } = await supabase.functions.invoke('strategy-remix', {
        body: { template_id: templateId, tenant_id }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success(`Successfully remixed "${templateTitle}"`, {
        description: "Template will be added to your strategy board"
      });
      
    } catch (err) {
      console.error("Error remixing template:", err);
      toast.error("Failed to remix template");
    }
  };

  return (
    <div className="container py-8">
      <DashboardBreadcrumb />
      
      <div className="flex items-center gap-2 mb-6">
        <File className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Strategy Vault</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Explore and remix top-performing strategies from across the platform.
      </p>

      {/* Industry filters */}
      {industries.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedIndustry === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(null)}
            >
              All Industries
            </Button>
            {industries.map(industry => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded-sm mb-2"></div>
                <div className="h-4 w-2/3 bg-muted rounded-sm"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length > 0 ? (
        <ul className="space-y-4">
          {filteredTemplates.map((tpl) => (
            <Card 
              key={tpl.id}
              className="border border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">{tpl.title}</h2>
                    <p className="text-sm text-muted-foreground">{tpl.industry}</p>
                    <p className="mt-2">{tpl.summary}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-muted-foreground text-right">
                      Used by {tpl.used_by}+ teams
                    </p>
                    <Button 
                      className="mt-2 text-xs" 
                      size="sm"
                      onClick={() => handleRemix(tpl.id, tpl.title)}
                    >
                      Remix →
                    </Button>
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
              {selectedIndustry 
                ? `No templates found for ${selectedIndustry}` 
                : "No strategy templates available"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
