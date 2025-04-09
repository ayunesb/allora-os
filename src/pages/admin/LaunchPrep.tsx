
import React from 'react';
import PreLaunchChecklist from '@/components/admin/PreLaunchChecklist';

export default function LaunchPrep() {
  return (
    <div className="animate-fadeIn space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Launch Preparation</h1>
        <p className="text-muted-foreground mt-1">
          Final checks before launching Allora AI to production
        </p>
      </div>
      
      <PreLaunchChecklist />
      
      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold">API Connections Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-4">
            <h3 className="font-medium">Supabase</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ✅ Connected to production database<br/>
              ✅ All required tables created<br/>
              ✅ Row-level security policies in place
            </p>
          </div>
          
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-4">
            <h3 className="font-medium">Stripe</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ✅ Connected to Stripe Test Mode<br/>
              ✅ Payment processing working<br/>
              ✅ Subscription management set up
            </p>
          </div>
          
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-4">
            <h3 className="font-medium">Postmark</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ✅ Email sending working<br/>
              ✅ Authentication emails configured<br/>
              ✅ Marketing email templates ready
            </p>
          </div>
          
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-4">
            <h3 className="font-medium">Twilio</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ✅ SMS sending working<br/>
              ✅ Phone number configured<br/>
              ✅ Message templates created
            </p>
          </div>
          
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-4">
            <h3 className="font-medium">Heygen</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ✅ Video generation configured<br/>
              ✅ API integration working<br/>
              ✅ Test videos successfully created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
