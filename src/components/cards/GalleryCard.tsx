import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hoverScale, imageZoom } from "@/utils/animations";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
}

const GalleryCard = ({ item, index }: GalleryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={hoverScale}
        className="h-full"
      >
        <Card 
          className="h-full overflow-hidden border-gray-200 dark:border-gray-800 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="p-0 h-full">
            {/* Image */}
            <div className="relative overflow-hidden">
              <motion.div className="aspect-[3/2]" whileHover={imageZoom}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <Badge className="absolute bottom-2 left-2 bg-black/60 hover:bg-black/70">
                {item.category}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            <motion.button
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryCard;