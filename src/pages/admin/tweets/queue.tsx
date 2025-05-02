import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from 'sonner';

interface QueuedTweet {
  id: string;
  content: string;
  scheduledFor: string;
  status: 'scheduled' | 'sent' | 'failed';
}

export default function TweetQueuePage() {
  const [queuedTweets, setQueuedTweets] = useState<QueuedTweet[]>([]);
  const [newTweetContent, setNewTweetContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Mock fetch for demo purposes
        // const response = await fetch('/api/tweets/queue');
        // const data = await response.json();
        
        // Simulate API response with mock data
        const mockData: QueuedTweet[] = [
          { id: '1', content: 'Excited to announce our new feature!', scheduledFor: '2023-05-15T12:00:00Z', status: 'scheduled' },
          { id: '2', content: 'Join our upcoming webinar on growth strategies', scheduledFor: '2023-05-20T15:30:00Z', status: 'scheduled' },
        ];
        
        // Fix the unknown type issue by explicitly typing the data
        setQueuedTweets(mockData as QueuedTweet[]);
      } catch (error) {
        console.error('Error fetching queued tweets:', error);
        // Handle error state
      }
    };
    
    fetchTweets();
  }, []);
  
  const handleDelete = async (tweetId: string) => {
    try {
      // Properly separate URL from options object
      const url = `/api/tweets/${tweetId}`;
      const options = { method: 'DELETE' };
      
      // Mock API call
      // const response = await fetch(url, options);
      // const result = await response.json();
      
      // Mock successful response
      const result = { success: true };
      
      if (result.success) {
        setQueuedTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== tweetId));
        toast({
          title: "Tweet Removed",
          description: "The tweet has been removed from the queue."
        });
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
      toast({
        title: "Error",
        description: "Failed to delete the tweet.",
        variant: "destructive"
      });
    }
  };
  
  const handleScheduleTweet = async () => {
    if (!newTweetContent || !scheduledDate) {
      toast({
        title: "Error",
        description: "Please enter tweet content and select a date.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Mock API call
      // const response = await fetch('/api/tweets/queue', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     content: newTweetContent,
      //     scheduledFor: scheduledDate.toISOString(),
      //   }),
      // });
      // const data = await response.json();

      // Mock successful response
      const mockNewTweet: QueuedTweet = {
        id: String(Date.now()),
        content: newTweetContent,
        scheduledFor: scheduledDate.toISOString(),
        status: 'scheduled',
      };

      // Update state
      setQueuedTweets(prevTweets => [...prevTweets, mockNewTweet]);
      setNewTweetContent('');
      setScheduledDate(undefined);

      toast({
        title: "Tweet Scheduled",
        description: "Your tweet has been scheduled successfully.",
      });
    } catch (error) {
      console.error('Error scheduling tweet:', error);
      toast({
        title: "Error",
        description: "Failed to schedule the tweet.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Tweet Queue</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Schedule New Tweet</CardTitle>
          <CardDescription>Plan your tweets in advance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tweet-content">Tweet Content</Label>
            <Input
              id="tweet-content"
              placeholder="What's on your mind?"
              value={newTweetContent}
              onChange={(e) => setNewTweetContent(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !scheduledDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button onClick={handleScheduleTweet}>Schedule Tweet</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Queued Tweets</CardTitle>
          <CardDescription>Manage your scheduled tweets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled For
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {queuedTweets.map((tweet) => (
                  <tr key={tweet.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tweet.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(tweet.scheduledFor), 'PPP p')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tweet.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(tweet.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
