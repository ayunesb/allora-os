import { toast } from './path/to/toast'; // Ensure correct import path

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
