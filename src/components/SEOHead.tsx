import React, { useEffect } from 'react';
import { RESTAURANT_CONFIG, generateRestaurantJsonLd } from '../data/restaurantConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = RESTAURANT_CONFIG.seo.title,
  description = RESTAURANT_CONFIG.seo.description,
}) => {
  useEffect(() => {
    // Dynamically update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = window.location.origin + window.location.pathname;
    canonical.setAttribute('href', currentUrl || RESTAURANT_CONFIG.seo.canonicalUrl);

    // Update or insert Schema.org JSON-LD script
    let scriptTag = document.getElementById('restaurant-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'restaurant-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(generateRestaurantJsonLd(RESTAURANT_CONFIG), null, 2);
  }, [title, description]);

  return null;
};
