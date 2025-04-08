
import { Check, X } from "lucide-react";

interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    label: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "Contains uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "Contains lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "Contains number",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: "special",
    label: "Contains special character",
    validator: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  const fulfilledRequirements = passwordRequirements.filter(req => 
    req.validator(password)
  ).length;
  
  return Math.min(100, (fulfilledRequirements / passwordRequirements.length) * 100);
}

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const strength = calculatePasswordStrength(password);
  
  const getStrengthLabel = (strength: number) => {
    if (strength <= 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 80) return "Medium";
    return "Strong";
  };
  
  const getStrengthColor = (strength: number) => {
    if (strength <= 0) return "bg-transparent";
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  return (
    <div className="space-y-3">
      <div className="w-full h-2 bg-muted rounded overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`} 
          style={{ width: `${strength}%` }}
        />
      </div>
      
      {password && (
        <div className="text-xs font-medium">
          Password strength: <span className="font-semibold">{getStrengthLabel(strength)}</span>
        </div>
      )}
      
      {password && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {passwordRequirements.map((requirement) => {
            const isFulfilled = requirement.validator(password);
            
            return (
              <div 
                key={requirement.id}
                className={`flex items-center gap-1.5 ${isFulfilled ? 'text-green-500' : 'text-muted-foreground'}`}
              >
                {isFulfilled ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
                <span>{requirement.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
