import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { pageVariants } from "@/utils/animations";
import { toast } from "sonner";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="py-16 pt-32"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to assist you with any questions or requests. Reach out to our team for personalized assistance.
          </p>
        </div>

        {/* Contact Info & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="text-amber-600 dark:text-amber-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">123 Luxury Lane</p>
                  <p className="text-gray-600 dark:text-gray-400">Beverly Hills, CA 90210</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Phone className="text-amber-600 dark:text-amber-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-600 dark:text-gray-400">+1 (800) ROYAL-ASHISH</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Mail className="text-amber-600 dark:text-amber-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@royalAshish.com</p>
                  <p className="text-gray-600 dark:text-gray-400">reservations@royalAshish.com</p>
                </div>
              </div>
              
              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Clock className="text-amber-600 dark:text-amber-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium">Reception:</p>
                      <p className="text-gray-600 dark:text-gray-400">24/7</p>
                    </div>
                    <div>
                      <p className="font-medium">Restaurant:</p>
                      <p className="text-gray-600 dark:text-gray-400">7:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Google Map Placeholder */}
            <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 h-64">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Interactive Map Goes Here</span>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-semibold mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={handleSelectChange}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="reservation">Room Reservation</SelectItem>
                    <SelectItem value="dining">Restaurant Booking</SelectItem>
                    <SelectItem value="event">Event Planning</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full">Send Message</Button>
              </div>
            </form>
            
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
              We value your privacy. All information submitted will be handled in accordance with our privacy policy.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-3">Room Reservations</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For the best rates and availability, book directly through our website.
            </p>
            <Button asChild variant="outline">
              <a href="/rooms">Book a Room</a>
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-3">Dining Reservations</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Secure your table at our award-winning restaurant for a memorable dining experience.
            </p>
            <Button asChild variant="outline">
              <a href="/menu">Reserve a Table</a>
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-3">Event Planning</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Host your special occasion or business event in our elegant venues.
            </p>
            <Button asChild variant="outline">
              <a href="/banquets">Plan an Event</a>
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Need assistance? Our friendly staff is available 24/7 to help you.
            </p>
            <Button asChild variant="outline">
              <a href="tel:+15551234567">Call Now</a>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What are your check-in and check-out times?",
                answer: "Check-in time is 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability."
              },
              {
                question: "Is breakfast included with the room?",
                answer: "Yes, all room reservations include our complimentary gourmet breakfast buffet served in the restaurant from 7:00 AM to 10:30 AM."
              },
              {
                question: "Do you offer airport transportation?",
                answer: "Yes, we provide airport shuttle service for our guests. Please arrange with our concierge at least 24 hours in advance of your arrival or departure."
              },
              {
                question: "Is there a cancellation fee?",
                answer: "Cancellations made more than 48 hours before the check-in date are fully refundable. Cancellations within 48 hours may be subject to a one-night charge."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;