/**
 * Centralized Restaurant Configuration & Metadata
 * 
 * Edit this file to customize all restaurant details, SEO properties,
 * contact numbers, timings, pricing policies, and brand copy in one place.
 * No details are hardcoded in the UI components.
 */

import { IMAGE_ASSETS } from '../assets/images';

export interface TimingShift {
  name: string;
  label: string;
  opens: string; // "07:00"
  closes: string; // "11:30"
  displayHours: string;
  days: string[];
}

export interface RestaurantConfig {
  brand: {
    name: string;
    shortName: string;
    legalName: string;
    monogram: string;
    tagline: string;
    headline: {
      part1: string;
      part2Highlight: string;
      part3: string;
      part3Highlight: string;
    };
    description: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
    cuisine: string[];
    priceRange: string;
    ogImage: string;
    menuFlyerImage?: string;
    author: string;
    locale: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappNumber: string; // For wa.me API link without + or spaces
    email: string;
    address: {
      street: string;
      landmark: string;
      locality: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    fullAddress: string;
    geo: {
      latitude: number;
      longitude: number;
    };
    googleMapsUrl: string;
  };
  timings: TimingShift[];
  orderPolicy: {
    currencySymbol: string;
    currencyCode: string;
    deliveryPackingCharge: number;
    takeawayPackingCharge: number;
    estimatedPrepTime: string;
    acceptedPaymentMethods: string[];
  };
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  story: {
    label: string;
    headline: string;
    italicHighlight: string;
    paragraphs: string[];
    values: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  brand: {
    name: 'Swathi Tiffins & Fast Food',
    shortName: 'Swathi Tiffins',
    legalName: 'Swathi Tiffins & Fast Food',
    monogram: 'S',
    tagline: 'Traditional Tiffins • Delicious Fast Food',
    headline: {
      part1: 'Fresh Food.',
      part2Highlight: 'Bold Flavours.',
      part3: 'Made ',
      part3Highlight: 'Fresh.',
    },
    description:
      'Freshly prepared tiffins and flavour-packed chicken dishes, made with quality ingredients and served with care.',
  },
  seo: {
    title: 'Swathi Tiffins & Fast Food | Authentic Restaurant in Hyderabad',
    description:
      'Authentic South Indian tiffins, crisp ghee dosas, steaming idlis, fiery chicken fry biryani, and wok-tossed fast food prepared fresh to order at Swathi Tiffins & Fast Food.',
    keywords: [
      'Swathi Tiffins',
      'Swathi Tiffins and Fast Food',
      'South Indian Tiffins Hyderabad',
      'Idly Dosa Sambar',
      'Chicken Fry Biryani',
      'Chicken Fried Rice',
      'Chilli Chicken',
      'Pesarattu',
      'Upma Pesarattu',
      'Fast Food Restaurant',
      'Takeaway Tiffins',
      'WhatsApp Food Order',
    ],
    canonicalUrl: 'https://swathitiffins.com',
    cuisine: ['South Indian', 'Indo-Chinese Fast Food', 'Biryani', 'Traditional Breakfast'],
    priceRange: '₹30 - ₹150',
    ogImage: IMAGE_ASSETS.heroBanner,
    menuFlyerImage: IMAGE_ASSETS.menuCard,
    author: 'Swathi Tiffins & Fast Food',
    locale: 'en_IN',
  },
  contact: {
    phone: '+91 9133117272',
    phoneDisplay: '+91 91331 17272',
    whatsapp: '+91 9133117272',
    whatsappNumber: '919133117272',
    email: 'hello@swathitiffins.com',
    address: {
      street: 'Main Road',
      landmark: 'Near Center',
      locality: 'Ramesampeta',
      city: 'Ramesampeta',
      state: 'Andhra Pradesh',
      postalCode: '533437',
      country: 'India',
    },
    fullAddress: 'Main Road, Ramesampeta',
    geo: {
      latitude: 17.0500,
      longitude: 82.0000,
    },
    googleMapsUrl: 'https://maps.google.com/?q=Ramesampeta',
  },
  timings: [
    {
      name: 'morning',
      label: 'Morning Tiffins',
      opens: '07:00',
      closes: '11:30',
      displayHours: '7:00 AM – 11:30 AM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      name: 'evening',
      label: 'Evening Fast Food & Biryani',
      opens: '17:00',
      closes: '23:00',
      displayHours: '5:00 PM – 11:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  ],
  orderPolicy: {
    currencySymbol: '₹',
    currencyCode: 'INR',
    deliveryPackingCharge: 0,
    takeawayPackingCharge: 0,
    estimatedPrepTime: '15–25 mins',
    acceptedPaymentMethods: [
      'Cash on Delivery',
      'UPI (Google Pay, PhonePe, Paytm)',
      'QR Code at counter',
    ],
  },
  socials: {
    instagram: 'https://instagram.com/swathitiffins',
    facebook: 'https://facebook.com/swathitiffins',
    whatsapp: 'https://wa.me/919133117272',
  },
  story: {
    label: 'OUR STORY',
    headline: 'Good food brings',
    italicHighlight: 'people together.',
    paragraphs: [
      'We started with a straightforward passion: serving genuine South Indian tiffins alongside bold, flavourful fast food that locals can rely on every single day.',
      'Every morning begins with freshly soaked lentils, stone-ground batter, and simmering pots of aromatic sambar. As the evening sets in, our woks fire up for hot stir-fried noodles, aromatic biryanis, and crispy spiced chicken.',
      'We keep our prices fair and our hospitality genuine because good food shouldn’t be an extravagance—it should simply be honest, warm, and delicious.',
    ],
    values: [
      {
        title: 'Honest Recipes',
        description: 'Tradition preserved with genuine ingredients and fresh stone-ground batter.',
      },
      {
        title: 'Freshly Made',
        description: 'No long-held batches or pre-cooked meals. Cooked hot per order.',
      },
      {
        title: 'Warm Service',
        description: 'Friendly hospitality for every guest, whether dining in or taking away.',
      },
    ],
  },
};

/**
 * Generates Schema.org JSON-LD structured data for Restaurant / FastFoodRestaurant
 */
export function generateRestaurantJsonLd(config: RestaurantConfig = RESTAURANT_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${config.seo.canonicalUrl}/#restaurant`,
    name: config.brand.legalName,
    alternateName: config.brand.name,
    image: [
      `${config.seo.canonicalUrl}${config.seo.ogImage}`,
    ],
    description: config.seo.description,
    servesCuisine: config.seo.cuisine,
    priceRange: config.seo.priceRange,
    telephone: config.contact.phone,
    email: config.contact.email,
    url: config.seo.canonicalUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${config.contact.address.street}, ${config.contact.address.landmark}`,
      addressLocality: config.contact.address.city,
      addressRegion: config.contact.address.state,
      postalCode: config.contact.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.contact.geo.latitude,
      longitude: config.contact.geo.longitude,
    },
    openingHoursSpecification: config.timings.map((shift) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: shift.days,
      opens: shift.opens,
      closes: shift.closes,
    })),
    hasMenu: `${config.seo.canonicalUrl}/#menu`,
    paymentAccepted: 'Cash, UPI',
    currenciesAccepted: config.orderPolicy.currencyCode,
  };
}
