interface PhoneDialerProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}
export default function PhoneDialer({
  phoneNumber,
  onPhoneNumberChange,
}: PhoneDialerProps): JSX.Element;
export {};
