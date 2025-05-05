import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import DangerZone from './DangerZone';
const ProfileFormFooter = ({ isLoading, isDirty, avatarFile, onReset }) => {
    return (<CardFooter className="flex flex-col items-end space-y-4">
      <div className="flex justify-end space-x-2 w-full">
        <Button type="button" variant="outline" onClick={onReset} disabled={isLoading || !isDirty}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || (!isDirty && !avatarFile)}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <DangerZone />
    </CardFooter>);
};
export default ProfileFormFooter;
