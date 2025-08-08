import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Users, Bed, Maximize, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatPrice } from "@/utils/formatters";
import { pageVariants } from "@/utils/animations";
import { toast } from "sonner";

// Import data
import roomsData from "@/data/rooms.json";

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [nights, setNights] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  
  // Find room
  const room = roomsData.find((r) => r.slug === slug);
  
  // Similar rooms (excluding current room)
  const similarRooms = roomsData
    .filter((r) => r.id !== room?.id)
    .slice(0, 3);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set default check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckIn(tomorrow.toISOString().split('T')[0]);
  }, [slug]);
  
  // Handle not found
  if (!room) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Room not found</h2>
        <Button asChild>
          <Link to="/rooms">Back to Rooms</Link>
        </Button>
      </div>
    );
  }
  
  // Handle booking
  const handleBookNow = () => {
    toast.success(`Thank you for booking ${room.name} for ${nights} night${nights > 1 ? 's' : ''}!`);
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
          Back to Rooms
        </Button>

        {/* Room Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold">{room.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="fill-amber-400 text-amber-400 h-4 w-4" />
                <span className="ml-1 font-medium">{room.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <Badge variant="outline">{room.availability ? "Available" : "Booked"}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatPrice(room.price)}</p>
            <p className="text-gray-500 dark:text-gray-400">per night</p>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {room.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-lg h-[400px] lg:h-[500px]">
                    <img 
                      src={image}
                      alt={`${room.name} - Image ${index + 1}`}
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

        {/* Room Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{room.description}</p>
            </div>
            
            <Separator />
            
            {/* Room Features */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Room Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>{room.size}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Booking Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Book This Room</h3>
              
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Check-in Date */}
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium mb-1">
                    Check-in Date
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    className="w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                
                {/* Number of Nights */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Number of Nights
                  </label>
                  <div className="flex items-center gap-2 border rounded-md p-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600 disabled:opacity-50"
                      disabled={nights <= 1}
                      onClick={() => setNights(Math.max(1, nights - 1))}
                    >
                      -
                    </button>
                    <span className="flex-1 text-center">{nights}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600"
                      onClick={() => setNights(nights + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{formatPrice(room.price)} × {nights} nights</span>
                    <span>{formatPrice(room.price * nights)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxes & fees</span>
                    <span>{formatPrice(room.price * nights * 0.15)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(room.price * nights * 1.15)}</span>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <Button className="w-full" onClick={handleBookNow} disabled={!room.availability}>
                  {room.availability ? "Book Now" : "Currently Unavailable"}
                </Button>
                
                {room.availability && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    No credit card required to reserve. You'll pay during your stay.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        {similarRooms.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-serif font-bold mb-6">Similar Accommodations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((room, index) => (
                <Link 
                  key={room.id}
                  to={`/rooms/${room.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={room.images[0]} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                      <Star className="fill-amber-400 stroke-amber-400 h-3 w-3" />
                      <span>{room.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                      {room.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{formatPrice(room.price)}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">per night</span>
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

export default RoomDetail;