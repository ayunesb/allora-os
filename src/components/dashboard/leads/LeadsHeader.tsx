import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, MessageSquareText } from "lucide-react";
export const LeadsHeader = ({ isMobileView }) => {
  return (
    <div className={`${isMobileView ? "px-4" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">
            Manage your leads and track their progress through your sales
            pipeline
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to="/dashboard/leads/linkedin">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/leads/follow-up-sequences">
              <MessageSquareText className="mr-2 h-4 w-4" />
              Follow-up Sequences
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
