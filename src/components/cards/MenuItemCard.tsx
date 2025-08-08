import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatters";
import { hoverScale, imageZoom } from "@/utils/animations";
import { useCart } from "@/lib/context/CartContext";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isVegetarian: boolean;
  spiceLevel: number;
}

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  layout?: "grid" | "list";
}

const MenuItemCard = ({ item, index, layout = "grid" }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const { id, name, category, price, description, image, isVegetarian, spiceLevel } = item;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image,
      category,
    });
    toast.success(`${name} added to cart`);
  };

  const renderSpiceLevel = () => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={`h-3 w-3 ${
              i < spiceLevel
                ? "text-red-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
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
        <CardContent className={`p-0 h-full ${
          layout === "list" ? "flex" : "flex flex-col"
        }`}>
          {/* Image */}
          <Link
            to={`/menu/${id}`}
            className={`block overflow-hidden ${
              layout === "list" ? "w-1/3" : "w-full aspect-[4/3]"
            }`}
          >
            <motion.div 
              className="h-full w-full"
              whileHover={imageZoom}
            >
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform"
              />
            </motion.div>
          </Link>

          {/* Content */}
          <div className={`flex flex-col ${
            layout === "list" 
              ? "p-4 w-2/3"
              : "p-4 flex-grow"
          }`}>
            {/* Category and Badges */}
            <div className="flex justify-between items-start mb-1">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              <div className="flex items-center gap-1">
                {isVegetarian && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 text-xs px-1.5 py-0 h-5">
                    Veg
                  </Badge>
                )}
              </div>
            </div>

            {/* Title */}
            <Link to={`/menu/${id}`} className="group">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {name}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {description}
            </p>

            <div className="mt-auto flex justify-between items-center">
              {/* Price and Spice Level */}
              <div>
                <span className="font-semibold text-lg">
                  {formatPrice(price)}
                </span>
                <div className="mt-1">{renderSpiceLevel()}</div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="sm"
                onClick={handleAddToCart}
                className="rounded-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MenuItemCard;