import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Square, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatters";
import { hoverScale, imageZoom } from "@/utils/animations";

interface Banquet {
  id: number;
  slug: string;
  name: string;
  description: string;
  capacity: {
    seated: number;
    standing: number;
    theater: number;
  };
  size: string;
  pricePerHour: number;
  minimumHours: number;
  images: string[];
  featured: boolean;
  rating: number;
}

interface BanquetCardProps {
  banquet: Banquet;
  index: number;
}

const BanquetCard = ({ banquet, index }: BanquetCardProps) => {
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
          <Link to={`/banquets/${banquet.slug}`} className="block overflow-hidden relative">
            <motion.div className="aspect-[16/9]" whileHover={imageZoom}>
              <img
                src={banquet.images[0]}
                alt={banquet.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {banquet.featured && (
              <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">
                Featured
              </Badge>
            )}
          </Link>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <Link to={`/banquets/${banquet.slug}`} className="group">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {banquet.name}
              </h3>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {banquet.description}
            </p>

            {/* Venue Details */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                <span>Up to {banquet.capacity.standing} guests</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Square className="h-4 w-4 mr-1" />
                <span>{banquet.size}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>Min {banquet.minimumHours} hours</span>
              </div>
            </div>

            {/* Price and Inquiry Button */}
            <div className="mt-auto flex justify-between items-center">
              <div>
                <span className="font-semibold text-lg">
                  {formatPrice(banquet.pricePerHour)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400"> / hour</span>
              </div>
              
              <Button asChild size="sm" className="rounded-full">
                <Link to={`/banquets/${banquet.slug}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BanquetCard;