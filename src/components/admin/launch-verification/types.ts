
export interface LaunchButtonProps {
  className?: string;
}

export interface LaunchStepState {
  isLaunching: boolean;
  launchStep: string | null;
  isComplete: boolean;
}
