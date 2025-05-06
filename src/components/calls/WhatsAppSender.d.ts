interface WhatsAppSenderProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}
export default function WhatsAppSender({
  phoneNumber,
  onPhoneNumberChange,
}: WhatsAppSenderProps): import("react").JSX.Element;
export {};
