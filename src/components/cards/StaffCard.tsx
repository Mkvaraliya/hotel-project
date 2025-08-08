import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hoverScale, imageZoom } from "@/utils/animations";

interface Staff {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
  experience: string;
  awards: string[];
  featured: boolean;
}

interface StaffCardProps {
  staff: Staff;
  index: number;
}

const StaffCard = ({ staff, index }: StaffCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={hoverScale}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-gray-200 dark:border-gray-800">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden">
            <motion.div className="aspect-[1/1]" whileHover={imageZoom}>
              <img
                src={staff.image}
                alt={staff.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {staff.featured && (
              <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                Featured
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg mb-1">{staff.name}</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium mb-2">{staff.role}</p>
            
            <div className="mb-3 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Specialty:</span> {staff.specialty}
              </p>
              <p className="text-sm">
                <span className="font-medium">Experience:</span> {staff.experience}
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
              {staff.bio}
            </p>

            {/* Awards */}
            {staff.awards && staff.awards.length > 0 && (
              <div className="mt-auto pt-2">
                <p className="text-sm font-medium mb-1">Awards & Recognitions:</p>
                <div className="flex flex-wrap gap-1">
                  {staff.awards.map((award, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {award}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StaffCard;