import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Search, SlidersHorizontal, X, Flame } from "lucide-react";
import { getPriceRange, formatPrice } from "@/utils/formatters";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  isVegetarian: boolean;
  spiceLevel: number;
  tags: string[];
  popularity?: number;
}

interface MenuFiltersProps {
  items: MenuItem[];
  onFilterChange: (filteredItems: MenuItem[]) => void;
}

const MenuFilters = ({ items, onFilterChange }: MenuFiltersProps) => {
  // Get all unique categories
  const allCategories = Array.from(new Set(items.map((item) => item.category)));
  
  // Calculate price range
  const { min: minPrice, max: maxPrice } = getPriceRange(items);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [maxSpiceLevel, setMaxSpiceLevel] = useState(5);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "popularity">("default");
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  useEffect(() => {
    let filtered = [...items];
    
    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    
    // Vegetarian filter
    if (isVegetarianOnly) {
      filtered = filtered.filter((item) => item.isVegetarian);
    }
    
    // Spice level filter
    filtered = filtered.filter((item) => item.spiceLevel <= maxSpiceLevel);
    
    // Price range filter
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        break;
    }
    
    onFilterChange(filtered);
  }, [
    items,
    searchQuery,
    selectedCategory,
    isVegetarianOnly,
    maxSpiceLevel,
    priceRange,
    sortBy,
    onFilterChange
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setIsVegetarianOnly(false);
    setMaxSpiceLevel(5);
    setPriceRange([minPrice, maxPrice]);
    setSortBy("default");
  };
  
  // Spice level indicator
  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={`h-4 w-4 ${
              i < level
                ? "text-red-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search our menu..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(selectedCategory || isVegetarianOnly || maxSpiceLevel < 5 || 
            priceRange[0] > minPrice || priceRange[1] < maxPrice || 
            sortBy !== "default") && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              <Check className="h-3 w-3" />
            </Badge>
          )}
        </Button>
        {(selectedCategory || isVegetarianOnly || maxSpiceLevel < 5 || 
          priceRange[0] > minPrice || priceRange[1] < maxPrice || 
          sortBy !== "default") && (
          <Button variant="ghost" size="sm" className="text-xs" onClick={resetFilters}>
            Reset All
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"
        initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0,
          overflow: showFilters ? 'visible' : 'hidden'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-sm mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vegetarian Toggle */}
          <div>
            <h3 className="font-medium text-sm mb-3">Dietary</h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="vegetarian-mode"
                checked={isVegetarianOnly}
                onCheckedChange={setIsVegetarianOnly}
              />
              <Label htmlFor="vegetarian-mode">Vegetarian Only</Label>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-medium text-sm mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={sortBy === "default" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("default")}
              >
                Featured
              </Badge>
              <Badge
                variant={sortBy === "price-asc" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("price-asc")}
              >
                Price: Low to High
              </Badge>
              <Badge
                variant={sortBy === "price-desc" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("price-desc")}
              >
                Price: High to Low
              </Badge>
              <Badge
                variant={sortBy === "popularity" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("popularity")}
              >
                Most Popular
              </Badge>
            </div>
          </div>

          {/* Spice Level */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Max Spice Level</h3>
              <span className="flex items-center">
                {renderSpiceLevel(maxSpiceLevel)}
              </span>
            </div>
            <Slider 
              value={[maxSpiceLevel]} 
              min={0} 
              max={5} 
              step={1} 
              onValueChange={([value]) => setMaxSpiceLevel(value)} 
              className="py-4"
            />
          </div>

          {/* Price Range */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Price Range</h3>
              <span className="text-sm">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </span>
            </div>
            <Slider 
              value={priceRange} 
              min={minPrice} 
              max={maxPrice} 
              step={0.01} 
              onValueChange={setPriceRange} 
              className="py-4"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuFilters;