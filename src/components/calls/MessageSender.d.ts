interface MessageSenderProps {
    phoneNumber: string;
    onPhoneNumberChange: (number: string) => void;
}
export default function MessageSender({ phoneNumber, onPhoneNumberChange }: MessageSenderProps): JSX.Element;
export {};
