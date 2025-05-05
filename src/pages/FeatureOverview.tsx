import React from 'react';
import { PageTitle } from '@/components/ui/page-title';
export default function FeatureOverview() {
    return (<div className="container mx-auto py-10">
      <PageTitle title="Feature Overview" description="Explore what Allora AI can do for your business">
        Feature Overview
      </PageTitle>
      
      <div className="mt-8 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">AI Executive Team</h2>
          <p className="text-muted-foreground">
            Access a virtual board of AI executives that provide specialized advice tailored to your business.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Dashboard & Analytics</h2>
          <p className="text-muted-foreground">
            Get personalized strategic overviews and actionable business recommendations.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Communication Tools</h2>
          <p className="text-muted-foreground">
            Make calls, send messages, and create customized scripts all from one platform.
          </p>
        </section>
      </div>
    </div>);
}
