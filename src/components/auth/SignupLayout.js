import { useNavigate } from "react-router-dom";
import { RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SignupLayout({ children }) {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6 text-primary"/>
          <span className="text-xl font-bold">Allora AI</span>
        </div>
        <div>
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-12 flex items-center justify-center">
        {children}
      </div>
    </div>);
}
