
import { Navbar } from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <ScrollArea className="bg-secondary/40 border border-border/50 rounded-lg p-6 h-[60vh]">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Data Protection</h2>
              <p className="text-gray-300">
                Your data is private, secure, and protected under GDPR and SOC2 standards. We implement 
                appropriate technical and organizational measures to ensure a level of security 
                appropriate to the risk.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-gray-300">
                We collect information that you provide directly to us, such as when you create an account, 
                use our services, or communicate with us. This may include your name, email address, 
                business information, and content you generate using our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300">
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and comply with legal obligations. We may also use anonymized data 
                to improve our AI models and enhance the quality of our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">4. Data Sharing</h2>
              <p className="text-gray-300">
                We do not sell your personal information. We may share your information with third-party 
                service providers who perform services on our behalf, such as hosting, analytics, and 
                customer support. These providers are bound by contractual obligations to keep personal 
                information confidential and use it only for the purposes for which we disclose it to them.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-300">
                Depending on your location, you may have certain rights regarding your personal information, 
                such as the right to access, correct, delete, or restrict processing of your personal 
                information. You can exercise these rights by contacting us at privacy@allora-ai.com.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-gray-300">
                We retain your personal information for as long as necessary to fulfill the purposes for 
                which we collected it, including for the purposes of satisfying any legal, accounting, 
                or reporting requirements.
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
