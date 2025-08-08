import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { pageVariants } from "@/utils/animations";

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <h1 className="text-9xl font-bold text-amber-600 dark:text-amber-400">404</h1>
      <h2 className="text-3xl font-serif font-bold mt-4 mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
        Let us guide you back to continue exploring Royal Ashish.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;