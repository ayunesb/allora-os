
import { useState } from 'react';
import { runExecutiveAgentHybrid } from '@/services/executiveWorkflowService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const ExecutiveActionPanel = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("Should we increase ad budget based on this month's revenue?");
  const [selectedExecutive, setSelectedExecutive] = useState("CMO");

  const handleRun = async () => {
    setLoading(true);
    try {
      const result = await runExecutiveAgentHybrid(prompt, selectedExecutive);
      setOutput(result);
    } catch (error) {
      console.error("Error running executive agent:", error);
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Executive Action Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="executive" className="text-sm font-medium">Executive Role</label>
          <select 
            id="executive"
            className="w-full p-2 border rounded-md"
            value={selectedExecutive}
            onChange={(e) => setSelectedExecutive(e.target.value)}
          >
            <option value="CEO">CEO</option>
            <option value="CMO">CMO</option>
            <option value="CTO">CTO</option>
            <option value="CFO">CFO</option>
            <option value="COO">COO</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">Your Question</label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full p-2 border rounded-md"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleRun} 
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Ask ${selectedExecutive}`
          )}
        </Button>
        
        {output && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border">
            <h3 className="font-medium mb-2">{selectedExecutive} Response:</h3>
            <div className="text-sm whitespace-pre-line">{output}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutiveActionPanel;
