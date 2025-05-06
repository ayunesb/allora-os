import { ApiKeys, ProfileFormData } from "@/components/profile/ProfileForm";
export declare function useProfileForm(): {
  isLoading: boolean;
  isDirty: boolean;
  errors: import("react-hook-form").FieldErrors<ProfileFormData>;
  avatarUrl: string;
  setAvatarUrl: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  avatarFile: File;
  setAvatarFile: import("react").Dispatch<import("react").SetStateAction<File>>;
  personalApiKeys: ApiKeys;
  handleApiKeyChange: (key: keyof ApiKeys, value: string) => void;
  register: import("react-hook-form").UseFormRegister<ProfileFormData>;
  handleSubmit: import("react-hook-form").UseFormHandleSubmit<
    ProfileFormData,
    ProfileFormData
  >;
  reset: import("react-hook-form").UseFormReset<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
};
