import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExecutiveBoard from '@/components/ExecutiveBoard';
export default function AiBoardroom() {
    // Mock data for the executive board
    const executives = [
        {
            id: '1',
            name: 'CEO AI',
            role: 'Chief Executive Officer',
            avatar: '/images/executive-avatars/ceo.png',
            status: 'active',
            specialties: ['Strategy', 'Leadership', 'Vision'],
            lastActivity: '2 minutes ago'
        },
        {
            id: '2',
            name: 'CFO AI',
            role: 'Chief Financial Officer',
            avatar: '/images/executive-avatars/cfo.png',
            status: 'active',
            specialties: ['Financial Analysis', 'Budgeting', 'Risk Management'],
            lastActivity: '15 minutes ago'
        },
        {
            id: '3',
            name: 'CMO AI',
            role: 'Chief Marketing Officer',
            avatar: '/images/executive-avatars/cmo.png',
            status: 'active',
            specialties: ['Brand Strategy', 'Digital Marketing', 'Growth'],
            lastActivity: '45 minutes ago'
        },
        {
            id: '4',
            name: 'CTO AI',
            role: 'Chief Technology Officer',
            avatar: '/images/executive-avatars/cto.png',
            status: 'learning',
            specialties: ['Technical Architecture', 'Innovation', 'Development'],
            lastActivity: '1 hour ago'
        },
        {
            id: '5',
            name: 'COO AI',
            role: 'Chief Operating Officer',
            avatar: '/images/executive-avatars/coo.png',
            status: 'active',
            specialties: ['Operations', 'Efficiency', 'Process Optimization'],
            lastActivity: '30 minutes ago'
        }
    ];
    const handleSelectExecutive = (executiveId) => {
        console.log(`Selected executive with ID: ${executiveId}`);
        // Handle executive selection, e.g., navigate to detailed view
    };
    return (<div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Executive Boardroom</CardTitle>
          <CardDescription>
            Collaborate with your AI executive team to generate strategies and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExecutiveBoard executives={executives} onSelectExecutive={handleSelectExecutive}/>
        </CardContent>
      </Card>
    </div>);
}
