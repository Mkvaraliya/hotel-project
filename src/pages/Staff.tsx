import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StaffCard from "@/components/cards/StaffCard";
import { pageVariants } from "@/utils/animations";

// Import data
import staffData from "@/data/staff.json";

const Staff = () => {
  // State for filtered staff
  const [filteredStaff, setFilteredStaff] = useState(staffData);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Get all unique roles
  const roles = Array.from(new Set(staffData.map((member) => member.role)));
  
  // Filter staff when role changes
  useEffect(() => {
    if (selectedRole) {
      setFilteredStaff(staffData.filter((member) => member.role === selectedRole));
    } else {
      setFilteredStaff(staffData);
    }
  }, [selectedRole]);

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
          <h1 className="text-4xl font-serif font-bold mb-4">Meet Our Team</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know the talented professionals dedicated to making your experience exceptional.
          </p>
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            variant={selectedRole === null ? "default" : "outline"} 
            onClick={() => setSelectedRole(null)}
          >
            All Staff
          </Button>
          
          {roles.map((role) => (
            <Button 
              key={role} 
              variant={selectedRole === role ? "default" : "outline"} 
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>

        {/* Staff Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaff.map((member, index) => (
              <StaffCard key={member.id} staff={member} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No staff members found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different role.
            </p>
          </div>
        )}

        {/* Careers Section */}
        <div className="mt-20 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're always looking for talented individuals passionate about hospitality and customer service.
              Explore career opportunities and become part of our award-winning team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/careers">View Open Positions</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact">Contact HR</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Staff;