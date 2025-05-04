import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Check, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';
const ExecutiveSelectionDialog = ({ isOpen, onClose, selectedExecutives, onExecutivesChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExecutives, setFilteredExecutives] = useState([]);
    const [availableExecutives, setAvailableExecutives] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    // Initialize all available executives
    useEffect(() => {
        const executives = [];
        Object.entries(executiveBots).forEach(([role, names]) => {
            names.forEach((name, index) => {
                executives.push({
                    id: `exec-${role}-${index}`,
                    name,
                    role,
                    title: formatRoleTitle(role),
                    specialty: getExecutiveSpecialty(role),
                    avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
                });
            });
        });
        setAvailableExecutives(executives);
    }, []);
    // Set filtered executives and selected IDs when dialog opens
    useEffect(() => {
        if (isOpen) {
            setFilteredExecutives(availableExecutives);
            setSelectedIds(selectedExecutives.map(exec => exec.id));
            setSearchQuery('');
        }
    }, [isOpen, availableExecutives, selectedExecutives]);
    // Filter executives by search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredExecutives(availableExecutives);
            return;
        }
        const query = searchQuery.toLowerCase();
        const filtered = availableExecutives.filter(exec => exec.name.toLowerCase().includes(query) ||
            exec.title.toLowerCase().includes(query) ||
            exec.specialty.toLowerCase().includes(query));
        setFilteredExecutives(filtered);
    }, [searchQuery, availableExecutives]);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const toggleExecutive = (execId) => {
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
        const selected = availableExecutives.filter(exec => selectedIds.includes(exec.id));
        onExecutivesChange(selected);
        onClose();
    };
    const getExecutiveSpecialty = (role) => {
        switch (role) {
            case 'ceo': return 'Strategic Vision, Leadership, Innovation';
            case 'cfo': return 'Financial Analysis, Risk Management, Investment Strategy';
            case 'coo': return 'Operations, Process Optimization, Execution';
            case 'cmo': return 'Marketing Strategy, Brand Development, Customer Insights';
            case 'strategy': return 'Competitive Analysis, Market Positioning, Growth Strategy';
            default: return 'Business Strategy, Leadership, Innovation';
        }
    };
    return (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5"/>
            Select Executive Team
          </DialogTitle>
          <DialogDescription>
            Choose 3-5 executives to participate in your boardroom debate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative my-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
          <Input placeholder="Search executives..." value={searchQuery} onChange={handleSearchChange} className="pl-8"/>
        </div>
        
        <ScrollArea className="h-[350px] pr-4">
          <div className="grid grid-cols-1 gap-2">
            {filteredExecutives.map(exec => {
            const isSelected = selectedIds.includes(exec.id);
            return (<div key={exec.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isSelected
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-card border hover:bg-accent/50'}`} onClick={() => toggleExecutive(exec.id)}>
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={exec.avatar} alt={exec.name}/>
                      <AvatarFallback>
                        {exec.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isSelected && (<div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-white"/>
                      </div>)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{exec.name}</h3>
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
                        {exec.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{exec.specialty}</p>
                  </div>
                </div>);
        })}
            
            {filteredExecutives.length === 0 && (<div className="text-center py-8">
                <p className="text-muted-foreground">No executives found matching your search.</p>
              </div>)}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="sm:mr-auto text-muted-foreground text-sm">
            {selectedIds.length} of 5 executives selected ({Math.max(3 - selectedIds.length, 0)} minimum, {5 - selectedIds.length} remaining)
          </div>
          
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          <Button onClick={handleSave} disabled={selectedIds.length < 3}>
            Confirm Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};
export default ExecutiveSelectionDialog;
