
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminOnly from '@/components/AdminOnly';

interface QueuedTweet {
  id: string;
  tenant_id: string;
  content: string;
  status: 'pending' | 'sent' | 'failed' | 'rejected';
  created_at: string;
  processed_at?: string;
  result?: any;
}

export default function TweetQueueAdmin() {
  const [tweets, setTweets] = useState<QueuedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const loadTweets = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/api/tweet-queue');
      setTweets(data || []);
    } catch (error) {
      console.error('Error loading tweets:', error);
      toast.error('Failed to load tweets');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionInProgress(id);
    try {
      const result = await fetchApi(`/api/tweet-queue?action=approve&id=${id}`, { method: 'POST' });
      if (result.success) {
        toast.success('Tweet sent successfully!');
      } else {
        toast.error('Failed to send tweet');
      }
      await loadTweets();
    } catch (error) {
      console.error('Error approving tweet:', error);
      toast.error('Failed to approve tweet');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionInProgress(id);
    try {
      await fetchApi(`/api/tweet-queue?action=reject&id=${id}`, { method: 'POST' });
      toast.success('Tweet rejected');
      await loadTweets();
    } catch (error) {
      console.error('Error rejecting tweet:', error);
      toast.error('Failed to reject tweet');
    } finally {
      setActionInProgress(null);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'rejected': return 'text-orange-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <AdminOnly>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">🐦 Tweet Approval Queue</h1>
            <p className="text-muted-foreground">Review and approve tweets before they are sent</p>
          </div>
          <Button onClick={loadTweets} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : tweets.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No tweets in the queue</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <Card key={tweet.id}>
                <CardContent className="pt-6">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-muted-foreground">Tenant ID: {tweet.tenant_id}</span>
                    <span className={`text-sm font-medium ${getStatusClass(tweet.status)}`}>
                      Status: {tweet.status.charAt(0).toUpperCase() + tweet.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="border rounded-md p-3 my-2 bg-muted/30">
                    <p className="whitespace-pre-wrap">{tweet.content}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(tweet.created_at).toLocaleString()}
                      {tweet.processed_at && ` • Processed: ${new Date(tweet.processed_at).toLocaleString()}`}
                    </span>
                    
                    {tweet.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          variant="success" 
                          size="sm" 
                          onClick={() => handleApprove(tweet.id)}
                          disabled={actionInProgress === tweet.id}
                        >
                          {actionInProgress === tweet.id ? 'Processing...' : '✅ Approve & Tweet'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleReject(tweet.id)}
                          disabled={actionInProgress === tweet.id}
                        >
                          ❌ Reject
                        </Button>
                      </div>
                    )}
                    
                    {tweet.status === 'failed' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(tweet.id)}
                        disabled={actionInProgress === tweet.id}
                      >
                        {actionInProgress === tweet.id ? 'Retrying...' : '🔁 Retry'}
                      </Button>
                    )}
                  </div>
                  
                  {tweet.result && tweet.status === 'failed' && (
                    <div className="mt-2 p-2 border border-red-500/20 rounded bg-red-500/5 text-xs">
                      <p>Error: {typeof tweet.result === 'object' ? tweet.result.error || JSON.stringify(tweet.result) : tweet.result}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminOnly>
  );
}
