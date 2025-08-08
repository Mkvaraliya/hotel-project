import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, Clock, Wifi, Utensils, MapPin, BadgeCheck, ShieldCheck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/sections/Hero";
import FeaturedItems from "@/components/sections/FeaturedItems";
import TestimonialSection from "@/components/sections/TestimonialSection";

// Import data
import menuData from "@/data/menu.json";
import roomsData from "@/data/rooms.json";
import banquetsData from "@/data/banquets.json";
import testimonialsData from "@/data/testimonials.json";
import { formatPrice } from "@/utils/formatters";

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Featured menu items
  const featuredMenuItems = menuData
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      link: `/menu/${item.id}`,
    }));

  // Featured rooms
  const featuredRooms = roomsData
    .filter(room => room.featured)
    .slice(0, 3)
    .map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      image: room.images[0],
      link: `/rooms/${room.slug}`,
    }));

  // Featured banquets
  const featuredBanquets = banquetsData
    .filter(banquet => banquet.featured)
    .slice(0, 3)
    .map(banquet => ({
      id: banquet.id,
      name: banquet.name,
      description: banquet.description,
      image: banquet.images[0],
      link: `/banquets/${banquet.slug}`,
    }));

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Luxury Redefined"
        subtitle="Experience exceptional hospitality with our fine dining restaurant and luxurious accommodations."
        image="/images/Exterior.jpg"
        ctaText="Book a Room"
        ctaLink="/rooms"
        secondaryCtaText="View Menu"
        secondaryCtaLink="/menu"
      />

      {/* Welcome Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-6">Welcome to Luxe Haven</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Nestled in the heart of the city, Luxe Haven offers a perfect blend of sophisticated luxury and 
              heartfelt hospitality. Our award-winning restaurant and sumptuous accommodations create an 
              unforgettable experience for all our guests.
            </p>
            <div className="flex justify-center gap-6">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/about">
                  Our Story <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="gap-2">
                <Link to="/contact">
                  Contact Us <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <FeaturedItems
        title="Culinary Excellence"
        subtitle="Indulge in our chef's finest creations, made with the freshest local ingredients."
        items={featuredMenuItems}
        viewAllLink="/menu"
        viewAllText="View Full Menu"
      />

      {/* Featured Rooms */}
      <FeaturedItems
        title="Luxury Accommodations"
        subtitle="Retreat to our elegantly appointed rooms and suites for a truly restful stay."
        items={featuredRooms}
        viewAllLink="/rooms"
        viewAllText="Explore All Rooms"
      />

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Rooms & Suites", value: "20+" },
              { label: "Years of Excellence", value: "15" },
              { label: "Michelin Stars", value: "2" },
              { label: "Satisfied Guests", value: "10k+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Banquets */}
      <FeaturedItems
        title="Memorable Events"
        subtitle="Host your special occasions in our stunning venues with expert event planning services."
        items={featuredBanquets}
        viewAllLink="/banquets"
        viewAllText="Discover Event Spaces"
      />

      {/* Testimonials */}
      <TestimonialSection testimonials={testimonialsData} />

      {/* Special Offer */}
      <section className="py-16 bg-amber-50 dark:bg-amber-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-serif font-bold mb-4">Special Dining & Stay Package</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Book a room and enjoy a complimentary 3-course dinner for two at our award-winning restaurant.
                    Available for stays of 2 nights or more.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                      <span>Luxury accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                      <span>3-course dinner for two</span>
                    </div>
                    <div className="flex items-center">
                      <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                      <span>Daily breakfast included</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-6">From {formatPrice(299)}/night</p>
                  <Button asChild>
                    <Link to="/rooms">Book This Offer</Link>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                className="rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/images/JuniorSuite.jpg" 
                  alt="Special Offer" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-serif font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Hotel Amenities
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Enjoy premium facilities and services throughout your stay.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
          >
            {[
              { icon: <Wifi className="h-6 w-6" />, label: "Free High-Speed WiFi" },
              { icon: <Clock className="h-6 w-6" />, label: "24/7 Room Service" },
              { icon: <Utensils className="h-6 w-6" />, label: "Fine Dining Restaurant" },
              { icon: <MapPin className="h-6 w-6" />, label: "Central Location" },
              { icon: <ShieldCheck className="h-6 w-6" />, label: "Enhanced Safety" },
              { icon: <CreditCard className="h-6 w-6" />, label: "Secure Payments" },
            ].map((amenity, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  {amenity.icon}
                </div>
                <h3 className="font-medium">{amenity.label}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-600 dark:bg-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2 
              className="text-3xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Experience Luxe Haven?
            </motion.h2>
            <motion.p 
              className="mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Book your stay or reserve a table at our restaurant to begin your journey of luxury and exceptional service.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild className="bg-white text-amber-600 hover:bg-gray-100">
                <Link to="/rooms">Book a Room</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/menu">Reserve a Table</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;