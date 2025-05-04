import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const DebateParameters = ({ debateTitle, debateObjective, debateDuration, onTitleChange, onObjectiveChange, onDurationChange, }) => {
    return (<>
      <div className="space-y-2">
        <Label htmlFor="title">Debate Title</Label>
        <Input id="title" value={debateTitle} onChange={(e) => onTitleChange(e.target.value)} placeholder="Enter a title for this debate"/>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="objective">Debate Objective</Label>
        <Textarea id="objective" value={debateObjective} onChange={(e) => onObjectiveChange(e.target.value)} placeholder="What should this debate achieve?" rows={3}/>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">Approximate Duration (minutes)</Label>
        <Select value={debateDuration} onValueChange={onDurationChange}>
          <SelectTrigger id="duration">
            <SelectValue placeholder="Select duration"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="10">10 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>);
};
export default DebateParameters;
