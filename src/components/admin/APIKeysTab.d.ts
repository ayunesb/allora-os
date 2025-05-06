export default function APIKeysTab({
  companyId,
  initialApiKeys,
  isLoading,
}: {
  companyId: string | null;
  initialApiKeys: {
    stripe: string;
    twilio_sid: string;
    twilio_token: string;
    heygen: string;
  };
  isLoading: boolean;
}): JSX.Element;
