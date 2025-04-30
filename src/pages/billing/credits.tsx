
import { useEffect, useState } from 'react';
import { getCurrentCreditBalance } from '@/utils/stripePayments';
import { useUser } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface CreditLog {
  id: string;
  tenant_id: string;
  credits_added: number;
  amount: number;
  email: string | null;
  source: string | null;
  session_id: string | null;
  created_at: string;
}

const CreditLogPage = () => {
  const { user } = useUser();
  const [logs, setLogs] = useState<CreditLog[]>([]);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadCredits = async () => {
      try {
        // Get current balance
        const balance = await getCurrentCreditBalance();
        setCurrentBalance(balance);
        
        // Get credit logs from Supabase
        const { data: creditLogs, error } = await supabase
          .from('credit_logs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setLogs(creditLogs || []);
      } catch (err) {
        console.error('Failed to load credit logs', err);
        toast.error('Failed to load credit history');
      } finally {
        setLoading(false);
      }
    };

    loadCredits();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Credit History</h1>
        {currentBalance !== null && (
          <Card className="w-full sm:w-auto">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold text-primary">{currentBalance} credits</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : logs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No credit transactions found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div>
                    <p className="text-lg font-medium">
                      {log.credits_added > 0 ? `+${log.credits_added}` : log.credits_added} credits
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Source: {log.source || 'Manual adjustment'}
                    </p>
                    {log.email && (
                      <p className="text-sm text-muted-foreground">Email: {log.email}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{formatDate(log.created_at)}</p>
                    {log.amount > 0 && (
                      <p className="text-sm font-medium">
                        ${(log.amount / 100).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditLogPage;
