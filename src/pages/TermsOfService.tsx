import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function TermsOfService() {
    return (<div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms of Service | Allora AI</title>
        <meta name="description" content="Terms and conditions for using Allora AI's services"/>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container max-w-4xl mx-auto py-12 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 pr-4">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p>Welcome to Allora AI, a business acceleration platform designed to help businesses make strategic decisions, develop growth strategies, and gain competitive insights. These Terms of Service govern your use of our website, products, and services.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Acceptance of Terms</h2>
                  <p>By accessing or using Allora AI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. Use License</h2>
                  <p>Permission is granted to temporarily use Allora AI for personal or business purposes, subject to the restrictions set forth in these Terms of Service. This license shall automatically terminate if you violate any of these restrictions.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. User Accounts</h2>
                  <p>When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Payment Terms</h2>
                  <p>Subscription fees are charged on a recurring basis. You may cancel your subscription at any time, but no refunds will be issued for the current billing period. We reserve the right to change our pricing with reasonable notice.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
                  <p>Allora AI and its original content, features, and functionality are owned by Allora AI, Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Data Privacy</h2>
                  <p>Your use of Allora AI is also governed by our Privacy Policy, which can be found at <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. By using Allora AI, you consent to the collection and use of information as detailed in our Privacy Policy.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
                  <p>Allora AI is provided "as is" and "as available" without any representations or warranties, express or implied. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the platform.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
                  <p>In no event shall Allora AI, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
                  <p>We may terminate or suspend your account and access to Allora AI immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
                  <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
                  <p>We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.</p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
                  <p>If you have any questions about these Terms, please contact us at legal@allora-ai.com.</p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>);
}
