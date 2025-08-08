import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import RoomCard from "@/components/cards/RoomCard";
import { pageVariants } from "@/utils/animations";

// Import data
import roomsData from "@/data/rooms.json";

const Rooms = () => {
  // State for filtered rooms
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("any");
  const [selectedBedType, setSelectedBedType] = useState("any");

  // Filter rooms when search terms change
  useEffect(() => {
    let results = [...roomsData];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (room) =>
          room.name.toLowerCase().includes(term) ||
          room.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by number of guests
    if (selectedGuests && selectedGuests !== "any") {
      const guests = parseInt(selectedGuests);
      results = results.filter((room) => room.maxGuests >= guests);
    }
    
    // Filter by bed type
    if (selectedBedType && selectedBedType !== "any") {
      results = results.filter((room) =>
        room.bedType.toLowerCase().includes(selectedBedType.toLowerCase())
      );
    }
    
    setFilteredRooms(results);
  }, [searchTerm, selectedGuests, selectedBedType]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGuests("any");
    setSelectedBedType("any");
  };
  
  // Get all unique bed types
  const bedTypes = Array.from(new Set(roomsData.map((room) => room.bedType)));

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
          <h1 className="text-4xl font-serif font-bold mb-4">Our Rooms & Suites</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience unparalleled comfort in our elegantly appointed accommodations, designed for relaxation and luxury.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search rooms..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <Label htmlFor="guests" className="mb-2 block">Number of Guests</Label>
              <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bed Type */}
            <div>
              <Label htmlFor="bed-type" className="mb-2 block">Bed Type</Label>
              <Select value={selectedBedType} onValueChange={setSelectedBedType}>
                <SelectTrigger id="bed-type">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {bedTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter tags and reset button */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(searchTerm || (selectedGuests && selectedGuests !== "any") || (selectedBedType && selectedBedType !== "any")) && (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Active filters:
                </span>
                
                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Search: {searchTerm}
                  </Badge>
                )}
                
                {selectedGuests && selectedGuests !== "any" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {selectedGuests}+ Guests
                  </Badge>
                )}
                
                {selectedBedType && selectedBedType !== "any" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {selectedBedType}
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="ml-auto text-xs"
                >
                  Reset All
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Room Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters to find available accommodations.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Rooms;