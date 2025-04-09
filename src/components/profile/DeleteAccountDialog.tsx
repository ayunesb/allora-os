
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { deleteUserAccount } from '@/utils/accountDeletion';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

const DeleteAccountDialog = () => {
  const [isInitialDialogOpen, setIsInitialDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteUserAccount();
      
      if (result.success) {
        await signOut();
        toast.success('Your account has been deleted');
        
        // If there was a partial deletion warning, show it
        if (result.error) {
          toast.warning(result.error);
        }
        
        // Redirect to home page after account deletion
        navigate('/');
      } else {
        toast.error(`Failed to delete account: ${result.error}`);
        setIsConfirmDialogOpen(false);
        setIsInitialDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFirstStep = () => {
    setIsInitialDialogOpen(false);
    setIsConfirmDialogOpen(true);
  };

  return (
    <>
      {/* Initial Delete Account Dialog */}
      <AlertDialog open={isInitialDialogOpen} onOpenChange={setIsInitialDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="mt-8">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete your account and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleFirstStep}>
              Continue to Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Final Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Final confirmation required</DialogTitle>
            <DialogDescription>
              Please type <strong>DELETE</strong> to confirm that you understand this action is permanent and cannot be undone.
              All your data, including profile information, company data (if you're the last admin), and account settings will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 py-4">
            <Label htmlFor="confirmText" className="text-destructive">Type DELETE to confirm:</Label>
            <Input
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={confirmText !== 'DELETE' || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Permanently Delete Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteAccountDialog;
