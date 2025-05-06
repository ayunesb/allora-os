import { toast } from './utils/toast'; // Update to the correct path

type Toast = {
  variant?: 'default' | 'destructive'; // ✅ Added 'destructive'
  // ...other properties...
};

// Example usage:
toast({
  title: 'Error!',
  description: 'Something went wrong',
  variant: 'destructive', // Ensure 'variant' is a valid property
});
