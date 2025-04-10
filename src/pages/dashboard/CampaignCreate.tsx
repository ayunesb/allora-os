
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdPlatformConnections } from '@/services/adPlatformService';
import CampaignCreateForm from '@/components/campaigns/CampaignCreateForm';
import ConnectPlatformsCard from '@/components/adplatforms/ConnectPlatformsCard';
import { motion } from 'framer-motion';

export default function CampaignCreate() {
  const [metaConnected, setMetaConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user has connected ad accounts
  useEffect(() => {
    const checkConnections = async () => {
      setIsLoading(true);
      try {
        const connections = await getAdPlatformConnections();
        
        setMetaConnected(connections.some(conn => conn.platform === 'meta' && conn.is_active));
        setTiktokConnected(connections.some(conn => conn.platform === 'tiktok' && conn.is_active));
      } catch (error) {
        console.error('Error checking ad platform connections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnections();
  }, []);

  const handleConnectAccounts = () => {
    navigate('/dashboard/ad-accounts');
  };

  // If no ad accounts are connected, show the connect platforms card
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-2xl animate-pulse">
          <div className="h-8 bg-muted rounded mb-4 w-1/2 mx-auto"></div>
          <div className="h-4 bg-muted rounded mb-8 w-2/3 mx-auto"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!metaConnected && !tiktokConnected) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Connect an Ad Account First</h1>
            <p className="text-muted-foreground">
              To create campaigns, you need to connect at least one ad platform account
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <ConnectPlatformsCard
              metaConnected={metaConnected}
              tiktokConnected={tiktokConnected}
              isLoading={false}
              onProceed={handleConnectAccounts}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Create a New Campaign</h1>
          <p className="text-muted-foreground">
            Set up your campaign details, targeting, and budget
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <CampaignCreateForm />
        </motion.div>
      </div>
    </div>
  );
}
