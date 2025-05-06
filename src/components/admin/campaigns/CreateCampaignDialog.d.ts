import { CampaignFormData } from "@/hooks/admin/useCampaignOperations";
interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  onSubmit: () => void;
  companies: Array<{
    id: string;
    name: string;
  }>;
  isSubmitting: boolean;
}
declare const CreateCampaignDialog: ({
  open,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
  companies,
  isSubmitting,
}: CreateCampaignDialogProps) => JSX.Element;
export default CreateCampaignDialog;
