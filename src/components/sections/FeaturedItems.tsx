import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/utils/animations";

interface FeaturedItem {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

interface FeaturedItemsProps {
  title: string;
  subtitle: string;
  items: FeaturedItem[];
  viewAllLink: string;
  viewAllText: string;
}

const FeaturedItems = ({
  title,
  subtitle,
  items,
  viewAllLink,
  viewAllText,
}: FeaturedItemsProps) => {
  console.log("Featured Items:", items); // Debugging log
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Featured Items */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          // initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {items.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link 
                to={item.link}
                className="group block h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild variant="outline" className="gap-2">
            <Link to={viewAllLink}>
              {viewAllText} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedItems;