import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Share2, ArrowUpCircle } from "lucide-react";
import { upgradeExecutiveBot } from '@/utils/executive-os/integrationService';
import { toast } from 'sonner';
export function UpgradeExecutiveBot({ botName, botRole, onUpgradeComplete }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpgraded, setIsUpgraded] = useState(false);
    const [upgradedBot, setUpgradedBot] = useState(null);
    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const result = await upgradeExecutiveBot(botName, botRole);
            if (result) {
                setUpgradedBot(result);
                setIsUpgraded(true);
                if (onUpgradeComplete) {
                    onUpgradeComplete(result);
                }
            }
            else {
                toast.error('Upgrade failed', {
                    description: 'Could not upgrade executive bot. Please try again.'
                });
            }
        }
        catch (error) {
            console.error('Error upgrading bot:', error);
            toast.error('Upgrade process failed', {
                description: 'An unexpected error occurred during the upgrade process.'
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<Card className="border border-primary/20 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{botName}</CardTitle>
          {isUpgraded && (<Badge variant="outline" className="bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3 mr-1"/> OS Integrated
            </Badge>)}
        </div>
        <CardDescription>{botRole}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {isUpgraded && upgradedBot ? (<div className="space-y-3">
            <div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary mb-1">
                <Sparkles className="h-4 w-4"/> Cognitive Boost
              </div>
              <p className="text-sm text-muted-foreground">{upgradedBot.cognitiveBoost}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary mb-1">
                <Brain className="h-4 w-4"/> Mental Model
              </div>
              <p className="text-sm text-muted-foreground">{upgradedBot.mentalModel}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary mb-1">
                <Share2 className="h-4 w-4"/> Strategic Focus
              </div>
              <p className="text-sm text-muted-foreground">{upgradedBot.strategicFocus}</p>
            </div>
            
            <div className="flex flex-wrap gap-1 pt-1">
              {upgradedBot.personalityTraits.map((trait, i) => (<Badge key={i} variant="secondary" className="text-xs">
                  {trait}
                </Badge>))}
            </div>
          </div>) : (<div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Upgrade this AI executive with the Allora Executive OS to enhance decision-making
              capabilities and strategic thinking.
            </p>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary"/> First Principles
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary"/> OODA Loop
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary"/> 80/20 Rule
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary"/> Mental Models
              </div>
            </div>
          </div>)}
      </CardContent>
      
      <CardFooter className="pt-2">
        {isUpgraded ? (<div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>Upgraded {new Date(upgradedBot?.lastIntegrationDate || '').toLocaleDateString()}</span>
            <Button variant="ghost" size="sm" className="h-8" onClick={() => setIsUpgraded(false)}>
              Details
            </Button>
          </div>) : (<Button className="w-full" variant="default" size="sm" disabled={isLoading} onClick={handleUpgrade}>
            {isLoading ? (<>
                <ArrowUpCircle className="mr-2 h-4 w-4 animate-spin"/>
                Upgrading...
              </>) : (<>
                <Sparkles className="mr-2 h-4 w-4"/>
                Upgrade Executive OS
              </>)}
          </Button>)}
      </CardFooter>
    </Card>);
}
