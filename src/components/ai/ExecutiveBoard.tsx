
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, BarChart, User, PlayCircle, ChevronRight } from 'lucide-react';

interface ExecutiveProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  background: string;
  expertise: string[];
  status: 'available' | 'busy' | 'offline';
}

const executives: ExecutiveProfile[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Chief Executive Officer',
    avatar: '/avatars/sarah-chen.png',
    background: 'Former CEO of Fortune 500 tech company, PhD in Business Strategy',
    expertise: ['Growth Strategy', 'Business Development', 'Executive Leadership'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'AI Chief Marketing Officer',
    avatar: '/avatars/michael-rodriguez.png',
    background: '15+ years in digital marketing, led campaigns for global brands',
    expertise: ['Brand Strategy', 'Digital Marketing', 'Customer Acquisition'],
    status: 'available'
  },
  {
    id: '3', 
    name: 'Dr. Aiko Nakamura',
    title: 'AI Chief Technology Officer',
    avatar: '/avatars/aiko-nakamura.png',
    background: 'PhD in Computer Science, former Head of Engineering at leading tech companies',
    expertise: ['Technology Strategy', 'Software Architecture', 'Data Science'],
    status: 'busy'
  },
  {
    id: '4',
    name: 'Jonathan Greene',
    title: 'AI Chief Financial Officer',
    avatar: '/avatars/jonathan-greene.png',
    background: 'MBA in Finance, former investment banker and startup advisor',
    expertise: ['Financial Planning', 'Investment Strategy', 'Risk Management'],
    status: 'available'
  }
];

function ExecutiveCard({ executive }: { executive: ExecutiveProfile }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={executive.avatar} />
              <AvatarFallback>{executive.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{executive.name}</CardTitle>
              <CardDescription>{executive.title}</CardDescription>
            </div>
          </div>
          <div className="relative flex items-center">
            <span className={`absolute top-1 left-1 w-2 h-2 rounded-full ${getStatusColor(executive.status)}`}></span>
            <Badge variant="outline" className="pl-4">
              {executive.status.charAt(0).toUpperCase() + executive.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Background</h4>
            <p className="text-sm text-muted-foreground">{executive.background}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Expertise</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {executive.expertise.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button size="sm" variant="default">
              <MessageCircle className="h-4 w-4 mr-1" /> Message
            </Button>
            <Button size="sm" variant="outline">
              <BarChart className="h-4 w-4 mr-1" /> Insights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ExecutiveBoard() {
  const [activeTab, setActiveTab] = useState('executives');
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'executives' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('executives')}
        >
          <User className="h-4 w-4 inline mr-1" /> 
          Executive Team
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'meetings' ? 'border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('meetings')}
        >
          <PlayCircle className="h-4 w-4 inline mr-1" /> 
          Boardroom Meetings
        </button>
      </div>
      
      {activeTab === 'executives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {executives.map(executive => (
            <ExecutiveCard key={executive.id} executive={executive} />
          ))}
        </div>
      )}
      
      {activeTab === 'meetings' && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Start Executive Meeting</CardTitle>
              <CardDescription>
                Create a virtual boardroom where executives debate and make decisions about your business strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                Start New Meeting <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Past Meetings</CardTitle>
              <CardDescription>
                Review previous executive debates and decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No past meetings found.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ExecutiveBoard;
