export default function WhatsAppFooter() {
    return (<div className="text-xs text-muted-foreground mt-2">
      <p>You can send WhatsApp messages directly through our Twilio integration or open WhatsApp Web.</p>
      <p>Status callbacks will be logged to track message delivery status.</p>
      <p className="mt-1 font-medium">Template messaging requires WhatsApp Business approval.</p>
    </div>);
}
