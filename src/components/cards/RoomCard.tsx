import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Bed, Maximize, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatters";
import { hoverScale, imageZoom } from "@/utils/animations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Room {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  bedType: string;
  size: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  featured: boolean;
  rating: number;
}

interface RoomCardProps {
  room: Room;
  index: number;
}

const RoomCard = ({ room, index }: RoomCardProps) => {
  const [nights, setNights] = useState(1);
  
  const handleBookNow = () => {
    toast.success(`Thank you for booking ${room.name} for ${nights} night${nights > 1 ? 's' : ''}!`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={hoverScale}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-gray-200 dark:border-gray-800">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image and Featured Badge */}
          <Link to={`/rooms/${room.slug}`} className="block overflow-hidden relative">
            <motion.div className="aspect-[16/9]" whileHover={imageZoom}>
              <img
                src={room.images[0]}
                alt={room.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {room.featured && (
              <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">
                Featured
              </Badge>
            )}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
              <Star className="fill-amber-400 stroke-amber-400 h-3 w-3" />
              <span>{room.rating.toFixed(1)}</span>
            </div>
          </Link>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <Link to={`/rooms/${room.slug}`} className="group">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {room.name}
              </h3>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {room.description}
            </p>

            {/* Room Details */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                <span>{room.maxGuests} guests</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Bed className="h-4 w-4 mr-1" />
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Maximize className="h-4 w-4 mr-1" />
                <span>{room.size}</span>
              </div>
            </div>

            {/* Price and Book Now */}
            <div className="mt-auto flex justify-between items-center">
              <div>
                <span className="font-semibold text-lg">
                  {formatPrice(room.price)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400"> / night</span>
              </div>
              
              {/* Dialog for Booking */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-full">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book {room.name}</DialogTitle>
                    <DialogDescription>
                      Select the number of nights you'd like to stay.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Number of Nights:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setNights(Math.max(1, nights - 1))}
                          disabled={nights <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{nights}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setNights(nights + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex justify-between">
                        <span>{nights} {nights > 1 ? 'nights' : 'night'} at {formatPrice(room.price)}/night</span>
                        <span>{formatPrice(room.price * nights)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes and fees</span>
                        <span>{formatPrice(room.price * nights * 0.15)}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total</span>
                        <span>{formatPrice(room.price * nights * 1.15)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleBookNow}>
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomCard;