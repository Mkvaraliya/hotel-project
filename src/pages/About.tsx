import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { pageVariants } from "@/utils/animations";

const About = () => {
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
          <h1 className="text-4xl font-serif font-bold mb-4">About Royal Ashish</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of luxury, comfort, and exceptional service.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-serif font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Founded in 2010, Royal Ashish began with a vision to create an unparalleled hospitality experience that combines 
              elegant accommodations with exceptional dining. What started as a boutique hotel with just 10 rooms has 
              now expanded into a renowned destination for travelers and food enthusiasts alike.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Over the years, we've maintained our commitment to personalized service while growing our offerings 
              to include our award-winning restaurant, state-of-the-art event spaces, and expanded luxury accommodations.
              Today, Royal Ashish stands as a testament to refined hospitality, where every detail is thoughtfully considered 
              to create memorable experiences for our guests.
            </p>
          </div>
          <div className="order-1 md:order-2 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-80">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Hotel History Image</span>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Our Philosophy */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-6">Our Philosophy</h2>
          <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
            "We believe that true luxury lies not just in elegant surroundings, but in the warmth of 
            personalized service and attention to every detail."
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            At Royal Ashish, we're dedicated to creating an environment where guests feel both pampered and at home.
            Our approach combines traditional hospitality values with contemporary luxury to deliver experiences that 
            exceed expectations.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Our Journey</h2>
          <div className="relative border-l-2 border-amber-600 dark:border-amber-400 ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-6 md:pl-0">
            {[
              { 
                year: "2010", 
                title: "Grand Opening", 
                description: "Royal Ashish opens its doors with 10 boutique rooms and a small café." 
              },
              { 
                year: "2013", 
                title: "Restaurant Launch", 
                description: "Our signature restaurant opens, quickly becoming a local favorite for fine dining." 
              },
              { 
                year: "2015", 
                title: "First Expansion", 
                description: "Hotel capacity doubled with the addition of luxury suites and enhanced amenities." 
              },
              { 
                year: "2018", 
                title: "Michelin Recognition", 
                description: "Our restaurant receives its first Michelin star, establishing us as a culinary destination." 
              },
              { 
                year: "2020", 
                title: "Renovation & Rebranding", 
                description: "Complete property renovation and rebranding to enhance the luxury experience." 
              },
              { 
                year: "2023", 
                title: "Expansion of Event Spaces", 
                description: "Addition of state-of-the-art banquet halls and event spaces for weddings and conferences." 
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`mb-8 md:grid md:grid-cols-5 md:gap-4 relative ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[11px] md:static md:col-span-2 flex items-center">
                  <div className={`h-5 w-5 rounded-full bg-amber-600 dark:bg-amber-400 md:absolute ${
                    index % 2 === 0 ? "md:right-[-9px]" : "md:left-[-9px]"
                  }`}></div>
                  <div className={`md:w-full flex ${
                    index % 2 === 0 ? "md:justify-end md:pr-6" : "md:justify-start md:pl-6"
                  }`}>
                    <span className="text-xl font-bold ml-4 md:ml-0">{item.year}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`md:col-span-3 ${
                  index % 2 === 0 ? "md:pl-6" : "md:pr-6"
                }`}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from the quality of our accommodations to the flavors in our cuisine."
              },
              {
                title: "Personalization",
                description: "We believe that truly memorable experiences come from understanding and anticipating each guest's unique preferences and needs."
              },
              {
                title: "Sustainability",
                description: "We're committed to responsible practices that minimize our environmental impact while maximizing the comfort and luxury we provide."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-80">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Sustainability Initiatives Image</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Our Commitment to Sustainability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At Royal Ashish, we believe that luxury and responsibility go hand in hand. Our sustainability 
              initiatives reflect our dedication to preserving the beauty of our environment while providing 
              exceptional experiences for our guests.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>• Energy-efficient operations throughout our property</li>
              <li>• Farm-to-table dining featuring locally-sourced ingredients</li>
              <li>• Waste reduction programs and comprehensive recycling</li>
              <li>• Water conservation measures in all facilities</li>
              <li>• Community engagement and support for local initiatives</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We're constantly evolving our practices to reduce our environmental footprint while enhancing 
              the luxury and comfort we provide to our guests.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-amber-50 dark:bg-amber-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Experience Royal Ashish</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            We invite you to discover the perfect blend of luxury, comfort, and exceptional service that defines the Royal Ashish experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/rooms">Book a Room</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/menu">Reserve a Table</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;