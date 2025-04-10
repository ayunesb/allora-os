
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Check, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';
import { DebateParticipant } from '@/utils/consultation/types';

interface ExecutiveSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExecutives: DebateParticipant[];
  onExecutivesChange: (executives: DebateParticipant[]) => void;
}

const ExecutiveSelectionDialog: React.FC<ExecutiveSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedExecutives,
  onExecutivesChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExecutives, setFilteredExecutives] = useState<DebateParticipant[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allExecutives, setAllExecutives] = useState<DebateParticipant[]>([]);
  
  // Initialize all available executives
  useEffect(() => {
    const executives: DebateParticipant[] = [];
    
    Object.entries(executiveBots).forEach(([role, names], roleIndex) => {
      names.forEach((name, nameIndex) => {
        executives.push({
          id: `exec-${roleIndex}-${nameIndex}`,
          name,
          role,
          title: formatRoleTitle(role),
          specialty: getExecutiveSpecialty(role),
          avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
        });
      });
    });
    
    setAllExecutives(executives);
  }, []);
  
  // Set filtered executives and selected IDs when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFilteredExecutives(allExecutives);
      setSelectedIds(selectedExecutives.map(exec => exec.id));
      setSearchQuery('');
    }
  }, [isOpen, allExecutives, selectedExecutives]);
  
  // Filter executives by search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExecutives(allExecutives);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = allExecutives.filter(
      exec => 
        exec.name.toLowerCase().includes(query) || 
        exec.title.toLowerCase().includes(query) ||
        exec.specialty.toLowerCase().includes(query)
    );
    
    setFilteredExecutives(filtered);
  }, [searchQuery, allExecutives]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleExecutive = (execId: string) => {
    setSelectedIds(prev => {
      // If already selected and we have more than the minimum required, remove
      if (prev.includes(execId) && prev.length > 3) {
        return prev.filter(id => id !== execId);
      }
      // If not selected and we don't have the maximum allowed, add
      else if (!prev.includes(execId) && prev.length < 5) {
        return [...prev, execId];
      }
      return prev;
    });
  };
  
  const handleSave = () => {
    const selected = allExecutives.filter(exec => selectedIds.includes(exec.id));
    onExecutivesChange(selected);
    onClose();
  };
  
  const getExecutiveSpecialty = (role: string): string => {
    switch (role) {
      case 'ceo': return 'Strategic Vision, Innovation, Leadership';
      case 'cfo': return 'Financial Analysis, Risk Management, Investment Strategy';
      case 'coo': return 'Operations, Process Optimization, Execution';
      case 'cmo': return 'Marketing Strategy, Brand Development, Customer Insights';
      case 'strategy': return 'Competitive Analysis, Market Positioning, Growth Strategy';
      default: return 'Business Strategy, Leadership, Innovation';
    }
  };
  
  const getExecutivePersonality = (name: string): string => {
    // Mock personalities for well-known executives
    const personalities: Record<string, string> = {
      'Elon Musk': 'Bold, innovative, risk-taking',
      'Jeff Bezos': 'Customer-obsessed, detail-oriented, long-term thinking',
      'Satya Nadella': 'Collaborative, growth mindset, transformational',
      'Tim Cook': 'Operational excellence, privacy-focused, incremental improvement',
      'Warren Buffett': 'Value-oriented, risk-averse, long-term investor',
      'Sheryl Sandberg': 'People-focused, operational excellence, scaling expertise',
      'Ruth Porat': 'Financial discipline, strategic investment, analytical'
    };
    
    return personalities[name] || 'Strategic, analytical, business-focused';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-purple-500" />
            Select Your Executive Team
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose 3-5 executives to participate in your boardroom debate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative my-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search executives..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 bg-gray-900 border-gray-800 text-white"
          />
        </div>
        
        <ScrollArea className="h-[350px] pr-4">
          <div className="grid grid-cols-1 gap-2">
            {filteredExecutives.map(exec => {
              const isSelected = selectedIds.includes(exec.id);
              
              return (
                <div 
                  key={exec.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-purple-950/50 border border-purple-800/50' 
                      : 'bg-gray-900 border border-gray-800 hover:bg-gray-800'
                  }`}
                  onClick={() => toggleExecutive(exec.id)}
                >
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-gray-800">
                      <AvatarImage src={exec.avatar} alt={exec.name} />
                      <AvatarFallback className="bg-purple-900 text-white">
                        {exec.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{exec.name}</h3>
                      <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-300">
                        {exec.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{exec.specialty}</p>
                    <p className="text-xs text-purple-400 mt-1">
                      <span className="font-medium">Personality:</span> {getExecutivePersonality(exec.name)}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {filteredExecutives.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No executives found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 border-t border-gray-800 pt-4">
          <div className="sm:mr-auto text-gray-400 text-sm">
            {selectedIds.length} of 5 executives selected ({Math.max(3 - selectedIds.length, 0)} minimum, {5 - selectedIds.length} remaining)
          </div>
          
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleSave}
            disabled={selectedIds.length < 3}
          >
            Confirm Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveSelectionDialog;
