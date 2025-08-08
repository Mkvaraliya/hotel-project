/**
 * Formats a price in USD
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Formats a date in a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Truncates text to a specific length
 * @param text - The text to truncate
 * @param maxLength - The maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Calculates a rating as percentage for CSS styling
 * @param rating - The rating (0-5)
 * @returns The percentage string
 */
export const ratingPercentage = (rating: number): string => {
  return `${(rating / 5) * 100}%`;
};

/**
 * Returns the appropriate CSS class for a spice level
 * @param level - The spice level (0-5)
 * @returns CSS class name
 */
export const getSpiceLevelClass = (level: number): string => {
  const levels = [
    'bg-gray-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-orange-100',
    'bg-red-100',
    'bg-red-500'
  ];
  
  return levels[Math.min(level, 5)];
};

/**
 * Creates a slug from a string
 * @param text - The text to slugify
 * @returns Slugified text
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

/**
 * Get min and max price from menu items
 * @param items - Array of menu items with price property
 * @returns Object with min and max price
 */
export const getPriceRange = (items: { price: number }[]): { min: number, max: number } => {
  if (!items.length) return { min: 0, max: 0 };
  
  const prices = items.map(item => item.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};