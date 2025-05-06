type Toast = {
  variant?: 'default' | 'destructive'; // ✅ Added 'destructive'
  // ...other properties...
};

// Example usage:
toast({ title: 'Error!', description: 'Something went wrong', variant: 'destructive' });
