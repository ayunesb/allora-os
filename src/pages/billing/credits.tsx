
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, CreditCard, RefreshCw } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize supabase client
const supabaseUrl = 'https://tnfqzklfdwknmplrygag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CreditsPage() {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    setIsLoading(true);
    try {
      // Simulate fetching credits from Supabase
      const { data, error } = await supabase
        .from('billing_profiles')
        .select('credits')
        .single();

      if (error) throw error;
      setCredits(data?.credits || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCredits(100); // Fallback to default credits
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseCredits = () => {
    // Implement credit purchase flow
    console.log('Purchase credits clicked');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Credits & Billing</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Your Credits
            </CardTitle>
            <CardDescription>
              Credits are used for AI operations and strategy generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">{isLoading ? '...' : credits}</p>
                <p className="text-sm text-muted-foreground mt-1">Available Credits</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchCredits} disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Purchase Credits
            </CardTitle>
            <CardDescription>
              Add more credits to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Purchase additional credits to continue using AI features and generating strategies.
              </p>
              <Button onClick={handlePurchaseCredits}>
                Buy More Credits
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
