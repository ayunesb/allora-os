
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Store, RefreshCw, Link } from 'lucide-react';
import { toast } from 'sonner';
import ShopifyOptimizationDashboard from '@/components/shopify/ShopifyOptimizationDashboard';
import { listShopifyProducts } from '@/utils/shopifyHelpers';

export default function ShopifyOptimization() {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>('');

  // For demo purposes, attempt to fetch products to see if already connected
  useEffect(() => {
    const checkConnection = async () => {
      const products = await listShopifyProducts();
      if (products && products.length > 0) {
        setIsConnected(true);
        // For demo purposes, just use the first product's vendor as the store ID
        setStoreId(products[0].vendor || 'demo-store');
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    if (!storeUrl) {
      toast.error('Please enter your Shopify store URL');
      return;
    }

    setIsConnecting(true);
    
    // In a real app, this would actually connect to the store via OAuth
    // For this demo, we'll simulate a successful connection
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsConnected(true);
      setStoreId('demo-store');
      toast.success('Shopify store connected successfully');
    } catch (error) {
      toast.error('Failed to connect to Shopify store');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Shopify Store Optimization</h1>
      </div>

      {!isConnected ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="h-5 w-5 mr-2" />
              Connect Your Shopify Store
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-500">
              Connect your Shopify store to get personalized optimization recommendations, 
              automated improvements, and detailed analytics to help increase your sales.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-url">Shopify Store URL</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="store-url" 
                    placeholder="yourstore.myshopify.com" 
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                  />
                  <Button onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Link className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-gray-400">
                By connecting your store, you'll grant us read and write access to optimize your store. 
                You can revoke access at any time from your Shopify admin panel.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ShopifyOptimizationDashboard storeId={storeId} />
      )}
    </div>
  );
}
