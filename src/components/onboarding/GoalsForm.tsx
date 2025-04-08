
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type GoalsFormProps = {
  goals: string[];
  toggleGoal: (goal: string) => void;
  companyName: string;
  industry: string;
}

export default function GoalsForm({ goals, toggleGoal, companyName, industry }: GoalsFormProps) {
  const goalOptions = [
    "Increase revenue",
    "Expand customer base",
    "Improve product/service",
    "Enter new markets",
    "Optimize operations",
    "Reduce costs"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Business Goals</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select the goals that align with your business strategy
      </p>
      
      <div className="grid grid-cols-1 gap-2">
        {goalOptions.map(goal => (
          <Button
            key={goal}
            type="button"
            variant={goals.includes(goal) ? "default" : "outline"}
            className="justify-start gap-2"
            onClick={() => toggleGoal(goal)}
          >
            {goals.includes(goal) && <CheckCircle2 className="h-4 w-4" />}
            {goal}
          </Button>
        ))}
      </div>
      
      <div className="p-4 bg-primary/10 rounded-lg mt-6">
        <p className="font-medium">Company: {companyName}</p>
        <p className="font-medium">Industry: {industry}</p>
        {goals.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Goals:</p>
            <ul className="list-disc pl-5 text-sm">
              {goals.map(goal => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
