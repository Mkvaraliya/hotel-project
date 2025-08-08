import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                  Royal
                </span>
                <span className="text-2xl font-serif font-light">Ashish</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Elevating hospitality with exceptional dining and luxurious accommodations in the heart of the city.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-amber-600 dark:hover:text-amber-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-amber-600 dark:hover:text-amber-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-amber-600 dark:hover:text-amber-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-amber-600 dark:hover:text-amber-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Rooms & Suites", path: "/rooms" },
                { name: "Restaurant & Bar", path: "/menu" },
                { name: "Events & Banquets", path: "/banquets" },
                { name: "Gallery", path: "/gallery" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>123 Luxury Avenue, City Center, 10001</span>
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>info@royalAshish.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                required
                className="bg-white dark:bg-gray-800"
              />
              <Button type="submit" variant="default">
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Royal Ashish Hotel & Restaurant. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;