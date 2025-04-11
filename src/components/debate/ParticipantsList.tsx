
import React from 'react';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Edit2 } from 'lucide-react';
import { DebateParticipant } from '@/utils/consultation/types';

interface ParticipantsListProps {
  participants: DebateParticipant[];
  onEditParticipants: () => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants = [], // Provide default empty array
  onEditParticipants,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Participants</Label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEditParticipants}
          className="flex items-center gap-1"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span>Edit Team</span>
        </Button>
      </div>
      {Array.isArray(participants) && participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {participants.map((bot) => (
            <div key={bot.id} className="flex items-center space-x-3 p-3 border rounded-md">
              <Avatar>
                <AvatarImage src={bot.avatar} alt={bot.name} />
                <AvatarFallback>{bot.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{bot.name}</p>
                <p className="text-sm text-muted-foreground truncate">{bot.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 border rounded-md text-center">
          <Users className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No participants added yet</p>
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;
