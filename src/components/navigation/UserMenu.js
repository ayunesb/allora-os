import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Settings, HelpCircle } from "lucide-react";
const UserMenu = ({ avatarUrl, name, email, onSignOut, isSigningOut, hasActiveSubscription }) => {
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl || ""} alt={name || ""}/>
            <AvatarFallback>{name?.[0] || email?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4"/>
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/faq">
            <HelpCircle className="mr-2 h-4 w-4"/>
            <span>FAQ</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!hasActiveSubscription && (<>
            <DropdownMenuItem asChild>
              <Link to="/pricing">Upgrade</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>)}
        <DropdownMenuItem onClick={onSignOut} disabled={isSigningOut} className="cursor-pointer">
          {isSigningOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
};
export default UserMenu;
