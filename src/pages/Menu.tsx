import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MenuFilters from "@/components/filters/MenuFilters";
import MenuItemCard from "@/components/cards/MenuItemCard";
import { pageVariants } from "@/utils/animations";

// Import data
import menuData from "@/data/menu.json";

const Menu = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for filtered items and view type
  const [filteredItems, setFilteredItems] = useState(menuData);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

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
          <h1 className="text-4xl font-serif font-bold mb-4">Restaurant Menu</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our carefully crafted dishes, prepared with the finest ingredients by our award-winning chefs.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Filters and View Toggle */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <div className="flex gap-2 border rounded-lg overflow-hidden">
              <Button
                variant={viewType === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("grid")}
                className={`rounded-none ${viewType === "grid" ? "" : "hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-100"}`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewType === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("list")}
                className={`rounded-none ${viewType === "list" ? "" : "hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-100"}`}
              >
                <LayoutList className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>

          <MenuFilters items={menuData} onFilterChange={setFilteredItems} />
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className={`grid ${
            viewType === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          } gap-6 mt-8`}>
            {filteredItems.map((item, index) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                index={index} 
                layout={viewType} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Menu;