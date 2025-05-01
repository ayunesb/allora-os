
// Import all UI components here for easier export

// Layout components
export * from './accordion';
export * from './alert';
export * from './alert-dialog';
export * from './aspect-ratio';
export * from './avatar';
export * from './badge';
export * from './breadcrumb';
export * from './button';
export * from './calendar';
export * from './card';
export * from './carousel';
export * from './checkbox';
export * from './collapsible';
export * from './command';
export * from './context-menu';
export * from './dialog';
export * from './drawer';
export * from './dropdown-menu';
export * from './form';
export * from './hover-card';
export * from './input';
export * from './input-otp';
export * from './label';
export * from './menubar';
export * from './navigation-menu';
export * from './pagination';
export * from './popover';
export * from './progress';
export * from './radio-group';
export * from './resizable';
export * from './scroll-area';
export * from './select';
export * from './separator';
export * from './sheet';
export * from './skeleton';
export * from './slider';
export * from './switch';
export * from './table';
export * from './tabs';
export * from './textarea';
// Explicitly re-export Textarea to avoid duplicate export error
// export * from './textarea';
export * from './toggle';
export * from './toggle-group';
export * from './tooltip';
export * from './typography';

// Import and re-export sonner for toast
export { toast, Toaster } from 'sonner';
// Export our custom useToast hook
export { useToast } from './use-toast';

// Define simple prop types for components that don't have them
// These are just basic interfaces to satisfy TypeScript imports elsewhere
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export interface SliderProps extends React.HTMLAttributes<HTMLSpanElement> {
  defaultValue?: number[];
  value?: number[];
  max?: number;
  step?: number;
  onValueChange?: (values: number[]) => void;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | undefined) => void;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
