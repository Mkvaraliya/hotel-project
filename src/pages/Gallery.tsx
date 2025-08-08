import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GalleryCard from "@/components/cards/GalleryCard";
import { pageVariants, containerVariants } from "@/utils/animations";

// Import data
import galleryData from "@/data/gallery.json";

const Gallery = () => {
  // State for filtered images
  const [filteredImages, setFilteredImages] = useState(galleryData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get all unique categories
  const categories = Array.from(new Set(galleryData.map((item) => item.category)));
  
  // Filter images when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredImages(galleryData.filter((item) => item.category === selectedCategory));
    } else {
      setFilteredImages(galleryData);
    }
  }, [selectedCategory]);

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
          <h1 className="text-4xl font-serif font-bold mb-4">Photo Gallery</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the elegance and luxury of our hotel and restaurant through our stunning photo gallery.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            onClick={() => setSelectedCategory(null)}
          >
            All Photos
          </Button>
          
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredImages.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No images found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category.
            </p>
          </div>
        )}

        {/* Virtual Tour Promo */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden text-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-serif font-bold mb-4">Take a Virtual Tour</h2>
              <p className="mb-6 opacity-90">
                Experience our luxurious facilities with our interactive 360° virtual tour. 
                Explore our rooms, restaurant, and amenities from the comfort of your home.
              </p>
              <div>
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  Start Virtual Tour
                </Button>
              </div>
            </div>
            <div className="h-64 md:h-auto bg-gray-700">
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white opacity-60">Hotel Lobby Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;