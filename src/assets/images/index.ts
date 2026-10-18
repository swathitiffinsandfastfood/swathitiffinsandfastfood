/**
 * Swathi Tiffins & Fast Food - Official Image Asset Registry
 * Centralized, properly named image assets for all dishes, hero banners, and menu cards.
 */

export const IMAGE_ASSETS = {
  // Brand & Atmosphere
  heroBanner: '/images/hero-banner.jpg',
  menuCard: '/images/swathi-menu-card.jpg',

  // Traditional South Indian Tiffins
  idly: '/images/idly-sambar.jpg',
  dosa: '/images/dosa.jpg',
  vada: '/images/vada.jpg',
  chapathi: '/images/chapathi.jpg',
  porota: '/images/porota.jpg',
  upmaPesarattu: '/images/upma-pesarattu.jpg',
  pesarattu: '/images/upma-pesarattu.jpg',

  // Evening Fast Food & Biryani
  chickenFriedRice: '/images/chicken-fried-rice.jpg',
  chickenNoodles: '/images/chicken-noodles.jpg',
  chickenFryBiryani: '/images/chicken-fry-biryani.jpg',
  chickenMughlaiBiryani: '/images/chicken-mughlai-biryani.jpg',
  chilliChicken: '/images/chilli-chicken.jpg',
} as const;

export type ImageAssetKey = keyof typeof IMAGE_ASSETS;
