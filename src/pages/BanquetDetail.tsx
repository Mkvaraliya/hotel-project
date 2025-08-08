import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Users, Square, Clock, BadgeCheck, Calendar, CreditCard, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice, formatDate } from "@/utils/formatters";
import { pageVariants } from "@/utils/animations";
import { toast } from "sonner";

// Import data
import banquetsData from "@/data/banquets.json";

const BanquetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: ""
  });
  
  // Find banquet
  const banquet = banquetsData.find((b) => b.slug === slug);
  
  // Other banquets (excluding current)
  const otherBanquets = banquetsData
    .filter((b) => b.slug !== slug)
    .slice(0, 3);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Handle not found
  if (!banquet) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Banquet venue not found</h2>
        <Button asChild>
          <Link to="/banquets">Back to Venues</Link>
        </Button>
      </div>
    );
  }
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your inquiry! Our events team will contact you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      message: ""
    });
  };

  return (
    <motion.div 
      className="py-16 pt-32"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 pl-0 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Venues
        </Button>

        {/* Banquet Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">{banquet.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">Event Venue</Badge>
              {banquet.featured && (
                <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatPrice(banquet.pricePerHour)}</p>
            <p className="text-gray-500 dark:text-gray-400">per hour</p>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-10">
          <Carousel className="w-full">
            <CarouselContent>
              {banquet.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-lg h-[400px] lg:h-[500px]">
                    <img 
                      src={image}
                      alt={`${banquet.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Venue Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">About This Venue</h2>
              <p className="text-gray-700 dark:text-gray-300">{banquet.description}</p>
            </div>
            
            {/* Venue Specs */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.capacity.seated}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Seated Capacity</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.capacity.standing}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Standing Capacity</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.capacity.theater}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Theater Style</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Square className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.size}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Venue Size</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.minimumHours} hours</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Minimum Booking</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                <span className="font-semibold">{banquet.rating}/5</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Client Rating</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Features & Amenities */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {banquet.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Packages & Past Events */}
            <Tabs defaultValue="packages" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="packages">Event Packages</TabsTrigger>
                <TabsTrigger value="pastEvents">Past Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="packages" className="pt-6">
                <div className="space-y-6">
                  {banquet.packages.map((pkg, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{pkg.description}</p>
                      <h4 className="font-medium text-sm mb-2">Package Includes:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <BadgeCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pastEvents" className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {banquet.pastEvents.map((event, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.images[0]} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{event.name}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-1">
                            <Users className="h-4 w-4" />
                            <span>{event.guests} guests</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Sidebar - Inquiry Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Inquire About This Venue</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Preferred Date
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    Number of Guests
                  </label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max={banquet.capacity.standing}
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Additional Information
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Send Inquiry
                  </Button>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    Our events team will contact you within 24 hours.
                  </p>
                </div>
              </form>
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Starting from</p>
                  <p className="text-2xl font-bold">{formatPrice(banquet.pricePerHour)}/hr</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <CreditCard className="h-4 w-4" />
                  <span>Various payment options</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Venues */}
        {otherBanquets.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-serif font-bold mb-6">Other Available Venues</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBanquets.map((banquet, index) => (
                <Link 
                  key={banquet.id}
                  to={`/banquets/${banquet.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={banquet.images[0]} 
                      alt={banquet.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {banquet.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                      {banquet.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{formatPrice(banquet.pricePerHour)}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">per hour</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BanquetDetail;