import { useEffect } from "react";
import { motion } from "framer-motion";
import BanquetCard from "@/components/cards/BanquetCard";
import { pageVariants } from "@/utils/animations";

// Import data
import banquetsData from "@/data/banquets.json";

const Banquets = () => {
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
          <h1 className="text-4xl font-serif font-bold mb-4">Event Venues & Banquets</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our elegant venues for weddings, corporate events, and special occasions, with dedicated event planning services.
          </p>
        </div>

        {/* Banner */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <img 
            src="/assets/banquets/grand-ballroom-1.jpg" 
            alt="Banquet Hall" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4">
              <h2 className="text-3xl font-bold mb-4">Create Memorable Events</h2>
              <p className="mb-6">
                From intimate gatherings to grand celebrations, our versatile venues and expert event team will help bring your vision to life.
              </p>
            </div>
          </div>
        </div>

        {/* Banquet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {banquetsData.map((banquet, index) => (
            <BanquetCard key={banquet.id} banquet={banquet} index={index} />
          ))}
        </div>

        {/* Events Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Weddings</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Create the wedding of your dreams in our elegant venues. Our dedicated wedding planners will assist with every detail, from décor to dining.
            </p>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Custom wedding packages</li>
              <li>• Expert planning services</li>
              <li>• Bridal suite access</li>
              <li>• Custom catering options</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Corporate Events</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Host productive meetings, conferences, and corporate retreats with our professional event spaces and business services.
            </p>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• State-of-the-art AV equipment</li>
              <li>• High-speed internet</li>
              <li>• Breakout rooms available</li>
              <li>• Corporate catering packages</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Social Gatherings</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Celebrate special moments with friends and family in our versatile spaces perfect for birthdays, anniversaries, and holiday parties.
            </p>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Customizable floor plans</li>
              <li>• Decorative lighting options</li>
              <li>• Entertainment coordination</li>
              <li>• Flexible menu choices</li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Plan Your Perfect Event</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Our event specialists are ready to help you create a memorable experience tailored to your specific needs and preferences.
          </p>
          <div className="flex justify-center">
            <a 
              href="/contact" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Contact Event Team
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banquets;