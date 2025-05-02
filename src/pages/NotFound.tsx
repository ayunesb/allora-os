
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";

export default function NotFound() {
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  const isAuthenticated = !!auth.user;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
          Go to {isAuthenticated ? "Dashboard" : "Homepage"}
        </Link>
      </Button>
    </div>
  );
}
