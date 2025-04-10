
import React from "react";
import { Phone } from "lucide-react";

export default function CallsHeader() {
  return (
    <>
      <div className="flex items-center mb-8">
        <Phone className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold">Call Center</h1>
      </div>
      
      <p className="text-xl text-gray-300 mb-6">
        Make calls, send messages, and manage call scripts
      </p>
    </>
  );
}
