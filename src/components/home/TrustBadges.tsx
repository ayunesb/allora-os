
import React from 'react';
import { Shield, ShieldCheck, Lock, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TrustBadges = () => {
  const badges = [
    {
      icon: ShieldCheck,
      label: 'GDPR Compliant',
      description: 'Our platform adheres to all GDPR requirements for data protection'
    },
    {
      icon: Shield,
      label: 'SOC 2 Certified',
      description: 'Validated security controls and procedures to protect your data'
    },
    {
      icon: Lock,
      label: 'Bank-Level Security',
      description: 'Enterprise-grade encryption for all your business data'
    },
    {
      icon: CheckCircle,
      label: 'ISO 27001',
      description: 'Internationally recognized information security standard'
    }
  ];

  return (
    <div className="w-full bg-background py-6 md:py-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <TooltipProvider>
            {badges.map((badge, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 border border-primary/20 bg-background/80 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <badge.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{badge.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
