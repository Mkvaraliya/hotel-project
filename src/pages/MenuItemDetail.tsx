import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Flame, ShoppingCart, Plus, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/utils/formatters";
import { pageVariants } from "@/utils/animations";

// Import data
import menuData from "@/data/menu.json";

const MenuItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find menu item
  const menuItem = menuData.find(item => item.id === Number(id));
  
  // Related items (same category, excluding current item)
  const relatedItems = menuData
    .filter(item => item.category === menuItem?.category && item.id !== menuItem?.id)
    .slice(0, 3);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Handle not found
  if (!menuItem) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Menu item not found</h2>
        <Button asChild>
          <Link to="/menu">Back to Menu</Link>
        </Button>
      </div>
    );
  }
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      image: menuItem.image,
      category: menuItem.category
    });
  };
  
  // Render spice level
  const renderSpiceLevel = () => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={`h-4 w-4 ${
              i < menuItem.spiceLevel
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
          Back to Menu
        </Button>

        {/* Item Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <motion.div
              className="rounded-lg overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Category & Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{menuItem.category}</Badge>
              {menuItem.isVegetarian && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  Vegetarian
                </Badge>
              )}
              {menuItem.tags && menuItem.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{menuItem.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold">{formatPrice(menuItem.price)}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Spice level:</span>
                  {renderSpiceLevel()}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300">{menuItem.description}</p>

            {/* Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-none"
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 rounded-none"
                >
                  +
                </Button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart - {formatPrice(menuItem.price * quantity)}
              </Button>
            </div>

            {/* Tabs for details */}
            <Tabs defaultValue="ingredients" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="recipe">Recipe</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {menuItem.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="recipe" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-3">Recipe Steps</h3>
                <ol className="space-y-3">
                  {menuItem.recipeSteps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>
              
              <TabsContent value="nutrition" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                    <p className="font-medium">{menuItem.nutrition.calories} kcal</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
                    <p className="font-medium">{menuItem.nutrition.protein} g</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
                    <p className="font-medium">{menuItem.nutrition.carbs} g</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
                    <p className="font-medium">{menuItem.nutrition.fat} g</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sodium</p>
                    <p className="font-medium">{menuItem.nutrition.sodium} mg</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-serif font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((item, index) => (
                <Link 
                  key={item.id}
                  to={`/menu/${item.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{formatPrice(item.price)}</span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
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

export default MenuItemDetail;