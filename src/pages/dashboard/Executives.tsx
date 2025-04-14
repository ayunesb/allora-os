
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/ui/page-title";
import { Trophy, Star } from "lucide-react";

interface Executive {
  id: string;
  name: string;
  role: string;
  level: string;
  star_rating: number;
  successful_actions: number;
  failed_actions: number;
}

export default function ExecutivesDashboard() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExecutives() {
      try {
        const { data, error } = await supabase
          .from("executives")
          .select("*")
          .order("star_rating", { ascending: false });

        if (error) throw error;
        setExecutives(data || []);
      } catch (error) {
        console.error("Failed to fetch executives:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExecutives();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading executives...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="AI Executive Team" 
        description="Performance and career progression of your AI executives"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {executives.map((exec) => (
          <Card key={exec.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{exec.name}</span>
                <Badge variant="secondary">{exec.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                <span>{exec.role}</span>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(exec.star_rating)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-sm text-muted-foreground">Successful Actions</span>
                  <p className="font-bold text-green-600">{exec.successful_actions}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Failed Actions</span>
                  <p className="font-bold text-red-600">{exec.failed_actions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
