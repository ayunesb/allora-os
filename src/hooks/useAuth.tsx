// Re-export the useAuth hook from the AuthContext
import { useAuth as useAuthFromContext } from "@/context/AuthContext";
export const useAuth = useAuthFromContext;
