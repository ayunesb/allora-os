import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
export default function Contact() {
    return (<div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input id="name" placeholder="Enter your name"/>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email"/>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?"/>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]"/>
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5"/>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@allora-ai.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5"/>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5"/>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 AI Innovation Way<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
}
