
import React from 'react';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DebateParticipant } from '@/utils/consultation/types';

interface ParticipantsListProps {
  participants: DebateParticipant[];
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
}) => {
  return (
    <div className="space-y-2">
      <Label>Participants</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {participants.map((bot) => (
          <div key={bot.id} className="flex items-center space-x-3 p-3 border rounded-md">
            <Avatar>
              <AvatarImage src={bot.avatar} />
              <AvatarFallback>{bot.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{bot.name}</p>
              <p className="text-sm text-muted-foreground truncate">{bot.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;
