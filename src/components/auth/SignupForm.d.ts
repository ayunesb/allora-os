import { SignupValues } from "@/hooks/useSignupForm";
import { User } from "@/types/fixed/User";
interface SignupFormProps {
    onSubmitSuccess?: (user: User) => void;
}
export default function SignupForm({ onSubmitSuccess }: SignupFormProps): import("react").JSX.Element;
export type { SignupValues };
