
import React from 'react';
import { Plus, Copy, Eye, EyeOff, Key, RefreshCcw, Trash } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  type: 'read' | 'write' | 'admin';
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
    {
      id: '1',
      name: 'Development API Key',
      key: 'ak_dev_1234567890abcdef',
      createdAt: '2025-03-01T12:00:00Z',
      lastUsed: '2025-04-10T08:30:00Z',
      type: 'read'
    },
    {
      id: '2',
      name: 'Production API Key',
      key: 'ak_prod_0987654321fedcba',
      createdAt: '2025-03-15T14:00:00Z',
      lastUsed: null,
      type: 'admin'
    }
  ]);

  const [newKeyName, setNewKeyName] = React.useState('');
  const [newKeyType, setNewKeyType] = React.useState<'read' | 'write' | 'admin'>('read');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [visibleKeys, setVisibleKeys] = React.useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    const newKey: ApiKey = {
      id: `${Date.now()}`,
      name: newKeyName,
      key: `ak_${newKeyType}_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      type: newKeyType
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setNewKeyType('read');
    setOpenDialog(false);
    toast.success('New API key created successfully');
  };

  const refreshApiKey = (id: string) => {
    setApiKeys(keys => 
      keys.map(key => 
        key.id === id 
          ? { 
              ...key, 
              key: `ak_${key.type}_${Math.random().toString(36).substring(2, 15)}`,
              createdAt: new Date().toISOString()
            } 
          : key
      )
    );
    toast.success('API key refreshed successfully');
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== id));
    toast.success('API key deleted successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Key Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage API keys for integrations.
          </p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for integrating with external services.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input 
                  id="key-name" 
                  placeholder="E.g., Production API Key" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="key-type">Key Type</Label>
                <select 
                  id="key-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newKeyType}
                  onChange={(e) => setNewKeyType(e.target.value as 'read' | 'write' | 'admin')}
                >
                  <option value="read">Read-only</option>
                  <option value="write">Read/Write</option>
                  <option value="admin">Admin (Full Access)</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateKey}>Create Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
          <CardDescription>
            Manage your active API keys. Keep these secure and never share them publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {visibleKeys[apiKey.id] ? apiKey.key : '••••••••••••••••••••••'}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys[apiKey.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyApiKey(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Key className="mr-2 h-4 w-4" />
                      <span className="capitalize">{apiKey.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {apiKey.lastUsed 
                      ? new Date(apiKey.lastUsed).toLocaleDateString() 
                      : 'Never used'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => refreshApiKey(apiKey.id)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteApiKey(apiKey.id)}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {apiKeys.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No API keys created yet. Click "Create New API Key" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> API keys provide access to your account. Never share them publicly or in client-side code.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
