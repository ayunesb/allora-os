import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export function UserDropdown({ onSignOut }) {
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard/profile">
            <Settings className="mr-2 h-4 w-4"/>
            Profile Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4"/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
}
