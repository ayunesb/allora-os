import { toast } from "@/utils/toast"; // Fix path
// Example usage:
const toastContent = {
    children: "Some title", // Replaced 'title' with 'children' to match the expected type
    // ...existing code...
};
toast({
    children: "Error!",
    description: "Something went wrong",
    variant: "destructive", // Ensure 'variant' is a valid property
});
