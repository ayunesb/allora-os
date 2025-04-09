
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from "@/components/Navbar";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Allora AI. These Terms of Service govern your use of our website, products, and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2>2. Use of Services</h2>
            <p>
              Our platform provides AI-powered business strategy tools and insights. You agree to use these services only
              for lawful purposes and in accordance with these Terms.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible
              for safeguarding your account credentials and for all activities that occur under your account.
            </p>

            <h2>4. Privacy Policy</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy, which can be found <a href="/privacy">here</a>.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              Our services and content are protected by copyright, trademark, and other intellectual property laws.
              You may not reproduce, distribute, or create derivative works without our permission.
            </p>

            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account and access to our services at our sole discretion, without notice,
              for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or inability to use our services.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. It is your responsibility to review these Terms periodically.
              Your continued use of our services after any changes indicates your acceptance of the modified Terms.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@alloraai.com.
            </p>

            <p className="text-sm text-muted-foreground mt-8">Last updated: April 9, 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
