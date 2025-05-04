import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/input';
import { Trash, Plus, Mail, MessageSquare, ArrowRight } from 'lucide-react';
export default function CampaignBuilder() {
    const [campaignName, setCampaignName] = useState('');
    const [blocks, setBlocks] = useState([]);
    const addBlock = (type) => {
        setBlocks([...blocks, {
                id: crypto.randomUUID(),
                type,
                content: '',
                delay: 0
            }]);
    };
    const removeBlock = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    };
    const updateBlockContent = (id, content) => {
        setBlocks(blocks.map(block => (block.id === id ? { ...block, content } : block)));
    };
    const updateBlockDelay = (id, delay) => {
        setBlocks(blocks.map(block => (block.id === id ? { ...block, delay } : block)));
    };
    const getBlockIcon = (type) => {
        switch (type) {
            case 'email':
                return <Mail className="h-5 w-5"/>;
            case 'sms':
                return <MessageSquare className="h-5 w-5"/>;
            case 'meta':
                return <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold">f</div>;
            case 'tiktok':
                return <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center text-xs text-white font-bold">T</div>;
            default:
                return null;
        }
    };
    return (<div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">🎯 Visual Campaign Builder</h1>
          <p className="text-muted-foreground">Create multi-channel marketing campaigns with drag-and-drop blocks</p>
        </div>
        <Button>Save Campaign</Button>
      </div>

      <div className="mb-6">
        <Input placeholder="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="max-w-md"/>
      </div>

      <div className="grid md:grid-cols-[1fr_3fr] gap-6">
        <div>
          <h2 className="text-lg font-medium mb-3">Blocks</h2>
          <div className="space-y-2">
            {['email', 'sms', 'meta', 'tiktok'].map(type => (<Button key={type} variant="outline" className="w-full justify-start" onClick={() => addBlock(type)}>
                {getBlockIcon(type)}
                <span className="ml-2">Add {type.toUpperCase()}</span>
              </Button>))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Campaign Flow</h2>
          
          {blocks.length === 0 ? (<Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>Add blocks from the left panel to build your campaign flow</p>
              </CardContent>
            </Card>) : (<div className="space-y-4">
              {blocks.map((block, index) => (<div key={block.id} className="relative">
                  {index > 0 && (<div className="absolute left-1/2 -top-4 transform -translate-x-1/2 flex flex-col items-center">
                      <div className="h-4 w-px bg-border"></div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90"/>
                    </div>)}
                  
                  <Card className="border-l-4" style={{ borderLeftColor: block.type === 'email' ? 'var(--primary)' :
                        block.type === 'sms' ? 'var(--green-500)' :
                            block.type === 'meta' ? 'var(--blue-500)' :
                                'var(--violet-500)'
                }}>
                    <CardContent className="p-4 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {getBlockIcon(block.type)}
                          <span className="ml-2 font-medium">{block.type.toUpperCase()} Block</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <span>Wait</span>
                            <Input type="number" value={block.delay} onChange={(e) => updateBlockDelay(block.id, parseInt(e.target.value) || 0)} className="w-16 h-6 text-xs py-0" min="0"/>
                            <span>days</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeBlock(block.id)}>
                            <Trash className="h-4 w-4"/>
                          </Button>
                        </div>
                      </div>
                      
                      <Textarea value={block.content} onChange={(e) => updateBlockContent(block.id, e.target.value)} placeholder={`Enter your ${block.type} content here...`} className="min-h-[100px]"/>
                      
                      {block.type === 'email' && (<div className="mt-3">
                          <Button variant="outline" size="sm">Add Subject Line</Button>
                        </div>)}
                    </CardContent>
                  </Card>
                </div>))}
              
              <Button variant="outline" className="w-full" onClick={() => addBlock('email')}>
                <Plus className="h-4 w-4 mr-2"/>
                Add Block
              </Button>
            </div>)}
        </div>
      </div>
    </div>);
}
