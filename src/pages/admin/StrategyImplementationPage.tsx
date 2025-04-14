
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Strategy } from "@/models/strategy";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import StrategyImplementationTools from '@/components/strategy-implementation/StrategyImplementationTools';

export default function StrategyImplementationPage() {
  const { id: strategyId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!strategyId) {
        setError('Strategy ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('strategies')
          .select('*')
          .eq('id', strategyId)
          .single();

        if (error) throw error;
        
        if (!data) {
          setError('Strategy not found');
        } else {
          setStrategy(data);
        }
      } catch (error: any) {
        console.error('Error fetching strategy:', error);
        setError(error.message || 'Failed to load strategy');
        toast.error('Failed to load strategy data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <TypographyH1>Strategy Implementation</TypographyH1>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-2">
              <div className="h-6 bg-muted rounded w-2/3 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-24 bg-muted rounded mt-4"></div>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-xl mb-2">Error Loading Strategy</CardTitle>
            <TypographyP>{error}</TypographyP>
            <Button className="mt-4" onClick={() => navigate('/admin/strategies')}>
              Return to Strategies
            </Button>
          </CardContent>
        </Card>
      ) : strategy ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{strategy.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <TypographyP>{strategy.description}</TypographyP>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Risk Level</h3>
                    <p className="text-lg">{strategy.risk || strategy.riskLevel || strategy.risk_level}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Created</h3>
                    <p className="text-lg">{new Date(strategy.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <p className="text-lg">{strategy.status || 'Active'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <StrategyImplementationTools 
            strategyId={strategy.id}
            strategyTitle={strategy.title}
          />
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-xl mb-2">Strategy Not Found</CardTitle>
            <TypographyP>The strategy you're looking for could not be found.</TypographyP>
            <Button className="mt-4" onClick={() => navigate('/admin/strategies')}>
              Return to Strategies
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
