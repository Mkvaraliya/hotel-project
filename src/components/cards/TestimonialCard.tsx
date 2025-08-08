import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import { hoverScale } from "@/utils/animations";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  // Render stars based on rating
  const renderStars = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= testimonial.rating
                ? "fill-amber-400/50 text-amber-400"
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
      <Card className="h-full border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Rating Stars */}
          <div className="mb-4">{renderStars()}</div>

          {/* Testimonial */}
          <blockquote className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
            "{testimonial.comment}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center mt-auto">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{testimonial.role}</span>
                <span>•</span>
                <time dateTime={testimonial.date}>
                  {formatDate(testimonial.date)}
                </time>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;