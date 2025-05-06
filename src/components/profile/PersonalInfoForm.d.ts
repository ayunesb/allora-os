import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileFormData } from "./ProfileForm";
interface PersonalInfoFormProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  userCreatedAt?: string;
}
declare const PersonalInfoForm: React.FC<PersonalInfoFormProps>;
export default PersonalInfoForm;
