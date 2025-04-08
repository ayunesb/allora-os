
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon, Sparkles, Brain } from "lucide-react";

// Executive bots data
const executiveBots = {
  ceo: ["Elon Musk", "Jeff Bezos", "Satya Nadella", "Tim Cook"],
  cfo: ["Warren Buffett", "Ruth Porat"],
  cio: ["Steve Jobs", "Bob Lord"],
  cmo: ["Antonio Lucio", "Keith Weed"],
  chro: ["Pat Wadors", "Laszlo Bock"],
  strategy: ["Clayton Christensen", "Reed Hastings"]
};

export default function ExecutiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(executiveBots).map(([role, names]) => (
        <Card key={role} className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {role === "ceo" && <RocketIcon className="h-5 w-5 text-primary" />}
              {role === "strategy" && <Sparkles className="h-5 w-5 text-primary" />}
              {(role !== "ceo" && role !== "strategy") && <Brain className="h-5 w-5 text-primary" />}
              <CardTitle className="text-lg capitalize">{role}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {names.map(name => (
                <li key={name} className="text-muted-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
