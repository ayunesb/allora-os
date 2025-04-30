
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/utils/api/apiClient';
import { Card } from '@/components/ui/card';

export default function TwitterConnectPage() {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [lastTweet, setLastTweet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load connection status
  useEffect(() => {
    if (!user) return;
    
    const loadTwitterStatus = async () => {
      try {
        // For now, we're using the simulation approach
        // In the future this will call a real endpoint
        setTimeout(() => {
          // Simulate loaded data for development
          const hasConnection = localStorage.getItem('twitter_connected') === 'true';
          if (hasConnection) {
            setConnected(true);
            setUsername('allora_ai');
            setLastTweet(new Date().toISOString());
          }
        }, 500);
        
        // Actual implementation would be:
        // const res = await fetchApi(`/api/twitter/status?tenant_id=${user.tenant_id}`);
        // setConnected(!!res.connected);
        // setUsername(res.username || '');
        // setLastTweet(res.last_tweet_at || null);
      } catch (err) {
        console.error('Failed to load Twitter status', err);
        toast.error('Failed to load Twitter connection status');
      }
    };
    
    loadTwitterStatus();
  }, [user]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // Simulated placeholder while Twitter dev access is blocked
      toast.success('Simulating Twitter Connect...');
      
      setTimeout(() => {
        setConnected(true);
        setUsername('allora_ai');
        setLastTweet(new Date().toISOString());
        localStorage.setItem('twitter_connected', 'true');
        toast.success('Twitter Connected! (mock)');
      }, 1000);

      // 🔒 Real version (uncomment once working):
      // const res = await fetchApi('/api/twitter/request-token');
      // window.location.href = res.url;
    } catch (err) {
      toast.error('Failed to connect Twitter.');
      console.error('Twitter connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Simulated disconnect
      toast.success('Disconnecting Twitter...');
      
      setTimeout(() => {
        setConnected(false);
        setUsername('');
        setLastTweet(null);
        localStorage.removeItem('twitter_connected');
        toast.success('Twitter disconnected successfully');
      }, 1000);
      
      // 🔒 Real version (uncomment once working):
      // await fetchApi('/api/twitter/disconnect', {
      //   method: 'POST',
      //   body: JSON.stringify({ tenant_id: user?.tenant_id })
      // });
    } catch (err) {
      toast.error('Failed to disconnect Twitter.');
      console.error('Twitter disconnection error:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔗 Twitter Integration</h1>
      <p className="text-muted-foreground mb-6">
        Connect your Twitter account to let Allora automatically publish your agent wins, strategy launches, and more.
      </p>

      <Card className="p-6 border border-border">
        {connected ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/30 space-y-2">
              <p className="text-sm flex items-center gap-2">
                <span className="h-4 w-4 bg-green-500 rounded-full"></span>
                Connected as <strong>@{username}</strong>
              </p>
              {lastTweet && (
                <p className="text-xs text-muted-foreground">
                  Last tweet sent: {new Date(lastTweet).toLocaleString()}
                </p>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Auto-posting preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="post-wins" defaultChecked />
                  <label htmlFor="post-wins" className="text-sm">Post agent wins</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="post-strategies" defaultChecked />
                  <label htmlFor="post-strategies" className="text-sm">Post new strategies</label>
                </div>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDisconnect}
              className="mt-4"
            >
              Disconnect Twitter
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm mb-4">
              Connect your Twitter account to automatically share updates about your business strategies
              and agent wins. This helps showcase your business growth and Allora's impact.
            </p>
            
            <Button onClick={handleConnect} disabled={loading} className="w-full">
              {loading ? 'Connecting...' : 'Connect Twitter'}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Note: You'll be redirected to Twitter to authorize this connection.
              No tweets will be posted without your permission.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
